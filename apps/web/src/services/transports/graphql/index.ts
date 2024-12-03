import {
  getTotalCO2EmissionQuery,
  getCO2EmissionByTravelBoundsQuery,
  getCO2EmissionPerKMQuery,
  getCO2EmissionByYearQuery,
  getCO2EmissionByYearAndModalQuery,
  getTransportsCO2EmissionModalAnalysisQuery,
} from "./queries";

import {
  TotalCO2EmissionResponse,
  CO2EmissionByTravelBoundsResponse,
  CO2EmissionByYearResponse,
  CO2EmissionPerKMResponse,
  TravelMode,
  CO2EmissionByYearAndModalResponse,
  CO2EmissionModalAnalysisResponse,
} from "@/types/transports";
import { graphQLClient } from "@/services/graphql";
import { convertTons } from "@/utils/convert-tons";
import { mappedTravelMode } from "@/constants/transports";
import { TransportFilters } from "@/store/transports";
import { TARGET_YEAR, REDUCTION_RATE, BASE_YEAR } from "@/constants/targets";

interface TransportationEmission {
  sum_full_co2e_tons: number;
  mode: string;
  year: number;
}

interface InputData {
  cube: { transportation_emission: TransportationEmission }[];
}

interface CardInfo {
  mode: string;
  changePercentage: number;
  contributionPercentage: number;
  trend: "increase" | "reduction";
}

function getEmissionAnalysisByYears(input: InputData): {
  reduction: CardInfo;
  increase: CardInfo;
} {
  const modeYearlyEmissions: { [mode: string]: { [year: number]: number } } =
    {};
  const totalEmissionsByYear: { [year: number]: number } = {};

  input.cube.forEach(({ transportation_emission }) => {
    const { mode, year, sum_full_co2e_tons } = transportation_emission;

    if (!modeYearlyEmissions[mode]) {
      modeYearlyEmissions[mode] = {};
    }
    modeYearlyEmissions[mode][year] = sum_full_co2e_tons;

    if (!totalEmissionsByYear[year]) {
      totalEmissionsByYear[year] = 0;
    }
    totalEmissionsByYear[year] += sum_full_co2e_tons;
  });

  const modeTrends: {
    [mode: string]: {
      changePercentage: number;
      trend: "increase" | "reduction";
      totalContribution: number;
    };
  } = {};

  for (const mode in modeYearlyEmissions) {
    const years = Object.keys(modeYearlyEmissions[mode])
      .map(Number)
      .sort((a, b) => a - b);
    const startYear = years[0];
    const endYear = years[years.length - 1];
    const startEmissions = modeYearlyEmissions[mode][startYear];
    const endEmissions = modeYearlyEmissions[mode][endYear];
    const changePercentage =
      (((endEmissions - startEmissions) / startEmissions) * 100) /
      (years.length - 1);

    const trend = changePercentage >= 0 ? "increase" : "reduction";

    const totalEmissionsAcrossYears = years.reduce(
      (sum, year) => sum + modeYearlyEmissions[mode][year],
      0
    );
    const totalEmissionsOverall = Object.values(totalEmissionsByYear).reduce(
      (sum, yearlyTotal) => sum + yearlyTotal,
      0
    );
    const totalContribution =
      (totalEmissionsAcrossYears / totalEmissionsOverall) * 100;

    modeTrends[mode] = {
      changePercentage: Math.abs(changePercentage),
      trend,
      totalContribution: parseFloat(totalContribution.toFixed(2)),
    };
  }

  let highestIncrease: CardInfo | null = null;
  let highestReduction: CardInfo | null = null;

  for (const mode in modeTrends) {
    const { changePercentage, trend, totalContribution } = modeTrends[mode];
    const cardInfo: CardInfo = {
      mode,
      changePercentage,
      contributionPercentage: totalContribution,
      trend,
    };

    if (trend === "increase") {
      if (
        !highestIncrease ||
        changePercentage > highestIncrease.changePercentage
      ) {
        highestIncrease = cardInfo;
      }
    } else if (trend === "reduction") {
      if (
        !highestReduction ||
        changePercentage > highestReduction.changePercentage
      ) {
        highestReduction = cardInfo;
      }
    }
  }

  return {
    reduction: highestReduction!,
    increase: highestIncrease!,
  };
}
export const calculateSimulatedCO2Emissions = (
  startEmissionData: number,
  targetEmission: number
) => {
  const startYear = new Date().getFullYear() - 1;
  const years = TARGET_YEAR - startYear;
  const annualReductionRate = Math.pow(
    targetEmission / startEmissionData,
    1 / years
  );

  const simulatedEmissions: { [year: number]: number } = {};
  let currentEmission = startEmissionData;

  for (let year = startYear; year <= TARGET_YEAR; year++) {
    simulatedEmissions[year] = currentEmission;
    currentEmission *= annualReductionRate;
  }

  return simulatedEmissions;
};

export const calculateCityEmissionTargets = (
  startEmissionData: number,
  startYear: number = BASE_YEAR
) => {
  const INITIAL_EMISSION_YEAR = startYear;

  const years = TARGET_YEAR - INITIAL_EMISSION_YEAR;
  const annualReductionRate = (1 - REDUCTION_RATE / 100) ** (1 / years);

  const targets: { [key: number]: number } = {};
  let currentTarget = startEmissionData;

  for (let year = INITIAL_EMISSION_YEAR; year <= TARGET_YEAR; year++) {
    targets[year] = currentTarget;
    currentTarget *= annualReductionRate;
  }

  return targets;
};

export const getTransportsCO2Emission = async ({
  filters,
}: {
  filters?: TransportFilters;
}) => {
  try {
    const query = getTotalCO2EmissionQuery({
      filters,
    });
    const data = await graphQLClient.request<TotalCO2EmissionResponse>(query, {
      queryName: "getTotalCO2EmissionQuery",
    });

    if (data) {
      const outboundCO2Emission = data.cube.find(
        (d) => d.transportation_emission.travel_bounds === "OUTBOUND"
      )?.transportation_emission;

      const inboundCO2Emission = data.cube.find(
        (d) => d.transportation_emission.travel_bounds === "INBOUND"
      )?.transportation_emission;

      const totalCo2Emission =
        (inboundCO2Emission?.sum_full_co2e_tons || 0) +
        (outboundCO2Emission?.sum_full_co2e_tons || 0);

      const inboundPercentage =
        (inboundCO2Emission?.sum_full_co2e_tons || 0) / totalCo2Emission;
      const outboundPercentage = 1 - inboundPercentage;

      const formattedData = {
        inbound: {
          co2Emission: inboundCO2Emission?.sum_full_co2e_tons || 0,
          trips: inboundCO2Emission?.sum_trips || 0,
          percentage: inboundPercentage,
        },
        outbound: {
          co2Emission: outboundCO2Emission?.sum_full_co2e_tons || 0,
          trips: outboundCO2Emission?.sum_trips || 0,
          percentage: outboundPercentage,
        },
        total: {
          co2Emission:
            (inboundCO2Emission?.sum_full_co2e_tons || 0) +
            (outboundCO2Emission?.sum_full_co2e_tons || 0),
          trips:
            (inboundCO2Emission?.sum_trips || 0) +
            (outboundCO2Emission?.sum_trips || 0),
        },
      };

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};
export const getTransportsCO2EmissionByTravelBounds = async ({
  filters,
}: {
  filters?: TransportFilters;
}) => {
  try {
    const query = getCO2EmissionByTravelBoundsQuery({ filters });
    const data = await graphQLClient.request<CO2EmissionByTravelBoundsResponse>(
      query,
      { queryName: "getCO2EmissionByTravelBoundsQuery" }
    );
    if (data) {
      const formattedData = Object.values(
        data.cube.reduce(
          (
            acc: Record<
              string,
              { name: string; withinLimit: number; outsideLimit: number }
            >,
            { transportation_emission }
          ) => {
            const { mode, sum_full_co2e_tons, travel_bounds } =
              transportation_emission;
            if (!acc[mode])
              acc[mode] = {
                name: mappedTravelMode[mode],
                withinLimit: 0,
                outsideLimit: 0,
              };

            if (travel_bounds === "INBOUND") {
              acc[mode].withinLimit += sum_full_co2e_tons;
            } else if (travel_bounds === "OUTBOUND") {
              acc[mode].outsideLimit += sum_full_co2e_tons;
            }

            return acc;
          },
          {}
        )
      );
      const filteredData = formattedData.filter(
        (item) => item.withinLimit !== 0 || item.outsideLimit !== 0
      );
      return filteredData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};

export const getTransportsCO2EmissionPerKM = async ({
  filters,
}: {
  filters?: TransportFilters;
}) => {
  try {
    const query = getCO2EmissionPerKMQuery({ filters });

    const data = await graphQLClient.request<CO2EmissionPerKMResponse>(query, {
      queryName: "getCO2EmissionPerKMQuery",
    });

    if (data) {
      const formattedData = data.cube
        .map(({ graph_transportation_emission_by_mode }) => {
          return {
            mode: mappedTravelMode[graph_transportation_emission_by_mode.mode],
            emissionCO2KgPerKm: convertTons(
              graph_transportation_emission_by_mode.avg_co2e_tons_per_km,
              "kg"
            ),
          };
        })
        .filter((item) => item.emissionCO2KgPerKm !== 0);

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};

export const getTransportsCO2EmissionByYearAndModal = async ({
  filters,
}: {
  filters?: {
    date: number[];
    mode: TravelMode[];
  };
}) => {
  try {
    const query = getCO2EmissionByYearAndModalQuery({ filters });
    const data = await graphQLClient.request<CO2EmissionByYearAndModalResponse>(
      query,
      { queryName: "getCO2EmissionByYearAndModalQuery" }
    );

    if (data) {
      const uniqueYears = Array.from(
        new Set(
          data.cube.map(
            ({ transportation_emission }) => transportation_emission.year
          )
        )
      ).sort();

      const resultMap: { [year: string]: { [key: string]: number } } = {};

      data.cube.forEach((entry) => {
        const { sum_full_co2e_tons, mode, year } =
          entry.transportation_emission;

        if (!resultMap[year]) {
          resultMap[year] = {};
        }

        if (!resultMap[year][mode]) {
          resultMap[year][mode] = 0;
        }

        resultMap[year][mode] += sum_full_co2e_tons;
      });

      const formattedData = uniqueYears.map((year) => {
        const entry: { [key: string]: any } = { year: year.toString() };

        if (resultMap[year]) {
          Object.keys(resultMap[year]).forEach((mode) => {
            entry[mappedTravelMode[mode as TravelMode]] = resultMap[year][mode];
          });
        }

        return entry;
      });

      const formattedDataWithNulls = formattedData.map((entry) => {
        const newEntry: { [key: string]: any } = { year: entry.year };
        Object.keys(entry).forEach((key) => {
          if (key !== "year") {
            newEntry[key] = entry[key] === 0 ? null : entry[key];
          }
        });
        return newEntry;
      });

      const uniqueModes = Array.from(
        new Set(
          data.cube.map(
            ({ transportation_emission }) => transportation_emission.mode
          )
        )
      );

      const filteredUniqueModes = uniqueModes.filter((mode) => {
        return formattedDataWithNulls.some(
          (entry) =>
            entry[mappedTravelMode[mode as TravelMode]] !== null &&
            entry[mappedTravelMode[mode as TravelMode]] !== undefined
        );
      });

      const emissionsAnalysis = getEmissionAnalysisByYears(data);
      return {
        data: formattedDataWithNulls,
        modals: filteredUniqueModes.map(
          (mode) => mappedTravelMode[mode as TravelMode]
        ),
        emissionsAnalysis,
      };
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};
export const getTransportsCO2EmissionByYear = async ({
  filters,
}: {
  filters?: {
    date: number[];
  };
}) => {
  try {
    const query = getCO2EmissionByYearQuery({ filters });
    const data = await graphQLClient.request<CO2EmissionByYearResponse>(query, {
      queryName: "getCO2EmissionByYearQuery",
    });

    if (data) {
      const emissionsByYear = data.cube
        .map(({ transportation_emission }) => {
          return {
            year: transportation_emission.year,
            co2Emission: transportation_emission.sum_full_co2e_tons,
          };
        })
        .filter((item) => item.year >= BASE_YEAR);

      return emissionsByYear;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};

export const getTransportsCO2EmissionModalAnalysis = async () => {
  try {
    const query = getTransportsCO2EmissionModalAnalysisQuery();
    const data = await graphQLClient.request<CO2EmissionModalAnalysisResponse>(
      query,
      {
        queryName: "getTransportsCO2EmissionModalAnalysisQuery",
      }
    );
    if (data) {
      const modalsData: {
        mode: TravelMode;
        percentageContribution: number;
        avgPercentageYearly: number;
        contributionStatus: "Redução" | "Elevação";
      }[] = data?.cube?.map(({ transportation_emission_cards }) => {
        return {
          mode: transportation_emission_cards.mode,
          percentageContribution:
            transportation_emission_cards.percentage_contribution,
          avgPercentageYearly:
            transportation_emission_cards.avg_percentage_yearly,
          contributionStatus: transportation_emission_cards.contribution_status,
        };
      });

      const reductionModals = modalsData?.filter(
        (modal) => modal.contributionStatus === "Redução"
      );
      const elevationModals = modalsData?.filter(
        (modal) => modal.contributionStatus === "Elevação"
      );

      const modalWithHighestYearlyReduction = reductionModals?.reduce(
        (max, modal) => {
          return modal.avgPercentageYearly > (max?.avgPercentageYearly || 0)
            ? modal
            : max;
        },
        null as (typeof modalsData)[0] | null
      );

      const modalWithLowestYearlyReduction = elevationModals?.reduce(
        (min, modal) => {
          return modal.avgPercentageYearly <
            (min?.avgPercentageYearly || Infinity)
            ? modal
            : min;
        },
        null as (typeof modalsData)[0] | null
      );
      const updatedModalsData = modalsData?.map((modal) => ({
        ...modal,
        isHighestYearlyReduction:
          modal.mode === modalWithHighestYearlyReduction?.mode,
        isLowestYearlyReduction:
          modal.mode === modalWithLowestYearlyReduction?.mode,
      }));

      const formattedData = {
        modalsData: updatedModalsData,
      };

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};
