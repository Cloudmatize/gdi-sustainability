import { graphQLClient } from "@/services/graphql";
import {
  getBuildingsCO2EmissionsBySectorQuery,
  getBuildingsEnergyFractionsBySectorQuery,
  getBuildingsEnergyIntensitiesBySectorQuery,
  getBuildingsFloorAreasBySectorQuery,
} from "./queries";

import {
  BuildingsCO2EmissionsBySectorResponse,
  BuildingsEnergyFractionsBySectorResponse,
  BuildingsEnergyIntensitiesBySectorResponse,
  BuildingsFloorAreasBySectorResponse,
} from "@/types/buildings";

import { mappedSectors } from "@/constants/buildings";
import { gradientColors } from "@/config/colors";

export const getBuildingsFloorAreasBySector = async ({}) => {
  // const mockedData = {
  //   residential: {
  //     area: 1000,
  //     sector: "Residencial",
  //     count: 10,
  //   },
  //   nonResidential: {
  //     area: 2000,
  //     sector: "Não Residencial",
  //     count: 20,
  //   },
  // };

  // return mockedData;
  try {
    const query = getBuildingsFloorAreasBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsFloorAreasBySectorResponse>(query, {
        queryName: "getBuildingsFloorAreasBySectorQuery",
      });

    if (data) {
      const mappedData = data.cube.map(({ buildings }) => {
        return {
          area: buildings.sum_floor_area,
          sector: mappedSectors[buildings.sector],
          count: buildings.buildings || 0,
          co2e_tons: buildings.co2e_tons,
        };
      });
      const residential = mappedData.find((d) => d.sector === "Residencial");
      const nonResidential = mappedData.find(
        (d) => d.sector === "Não Residencial"
      );
      const totalCo2Emission =
        (residential?.co2e_tons || 0) + (nonResidential?.co2e_tons || 0);

      const residentialPercentage =
        (residential?.co2e_tons || 0) / totalCo2Emission;

      const nonResidentialPercentage = 1 - residentialPercentage;

      const formattedData = {
        residential: {
          area: residential?.area || 0,
          count: residential?.count || 0,
          co2Emission: residential?.co2e_tons || 0,
          percentage: residentialPercentage,
        },
        notResidential: {
          area: nonResidential?.area || 0,
          count: nonResidential?.count || 0,
          co2Emission: nonResidential?.co2e_tons || 0,
          percentage: nonResidentialPercentage,
        },
        total: {
          area: (residential?.area || 0) + (nonResidential?.area || 0),
          count: (residential?.count || 0) + (nonResidential?.count || 0),
          co2Emission:
            (residential?.co2e_tons || 0) + (nonResidential?.co2e_tons || 0),
        },
      };

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsFloorAreasBySectorQuery", error);
  }
};

export const getBuildingsCO2EmissionsBySector = async ({}) => {
  // const mockedData = [
  //   {
  //     co2e: 1000,
  //     sector: "Residencial",
  //     color: "#2DD4BF",
  //   },
  //   {
  //     co2e: 2000,
  //     sector: "Não Residencial",
  //     color: "#99F6E4",
  //   },
  // ];
  // return mockedData;
  try {
    const query = getBuildingsCO2EmissionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsCO2EmissionsBySectorResponse>(
        query,
        {
          queryName: "getBuildingsCO2EmissionsBySectorQuery",
        }
      );

    if (data) {
      const formattedData = data.cube.map(({ buildings }, index) => {
        return {
          co2e: buildings.co2e_tons,
          sector: mappedSectors[buildings.sector],
          color: index === 0 ? gradientColors[0] : gradientColors[2],
        };
      });

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsCO2EmissionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyFractionsBySector = async ({}) => {
  // const mockedData = [
  //   {
  //     sector: "Residencial",
  //     propane: 0.1,
  //     dieselOil: 0.2,
  //     electricity: 0.3,
  //     naturalGas: 0.4,
  //   },
  //   {
  //     sector: "Não Residencial",
  //     propane: 0.1,
  //     dieselOil: 0.2,
  //     electricity: 0.3,
  //     naturalGas: 0.4,
  //   },
  // ];

  // return mockedData;

  try {
    const query = getBuildingsEnergyFractionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyFractionsBySectorResponse>(
        query
      );

    if (data) {
      const energyFractions = data.cube.map(({ buildings }) => {
        const fractions = {
          PROPANE: buildings.propane_fraction,
          ELECTRICITY: buildings.diesel_oil_fraction,
          DIESEL_OIL: buildings.electricity_fraction,
          NATURAL_GAS: buildings.natural_gas_fraction,
        };

        (Object.keys(fractions) as Array<keyof typeof fractions>).forEach(
          (key) => {
            if (fractions[key] === 0) {
              delete fractions[key];
            }
          }
        );

        const sortedFractions = Object.entries(fractions)
          .sort(([, a], [, b]) => b - a)
          .reduce((acc: Record<string, number>, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        return {
          sector: mappedSectors[buildings.sector],
          ...sortedFractions,
        };
      });

      const totalEmissionsByFraction = data.cube.reduce(
        (acc, { buildings }) => {
          acc.PROPANE =
            (acc.PROPANE || 0) +
            buildings.propane_fraction * buildings.co2e_tons;
          acc.ELECTRICITY =
            (acc.ELECTRICITY || 0) +
            buildings.electricity_fraction * buildings.co2e_tons;
          acc.DIESEL_OIL =
            (acc.DIESEL_OIL || 0) +
            buildings.diesel_oil_fraction * buildings.co2e_tons;
          acc.NATURAL_GAS =
            (acc.NATURAL_GAS || 0) +
            buildings.natural_gas_fraction * buildings.co2e_tons;
          return acc;
        },
        {} as Record<string, number>
      );

      const totalEmissions = Object.values(totalEmissionsByFraction).reduce(
        (sum, value) => sum + value,
        0
      );

      const totalEmissionCO2ByFraction = Object.entries(
        totalEmissionsByFraction
      )
        .map(([key, co2Emission]) => ({
          name: key,
          co2Emission,
          percentage: co2Emission / totalEmissions,
        }))
        .filter(({ co2Emission }) => co2Emission > 0);

      const formattedData = {
        totalEmissionCO2ByFraction,
        energyFractions,
      };

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsEnergyFractionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyIntensitiesBySector = async ({}) => {
  // const mockedData = [
  //   {
  //     energy: 1000,
  //     propane: 2000,
  //     dieselOil: 3000,
  //     electricity: 4000,
  //     naturalGas: 5000,
  //   },
  // ];
  // const formattedData = mockedData
  //   .map((item) => {
  //     const total = Object.values(item).reduce((acc, value) => acc + value, 0);
  //     return Object.entries(item).map(([key, value]) => {
  //       return {
  //         name: key,
  //         value: value,
  //         percentage: Number(((value / total) * 100).toFixed(2)),
  //       };
  //     });
  //   })
  //   .flat();
  // return formattedData;

  try {
    const query = getBuildingsEnergyIntensitiesBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyIntensitiesBySectorResponse>(
        query
      );

    if (data) {
      const mappedData = data.cube.map(({ buildings_intensity }) => {
        const intensities = {
          PROPANE: buildings_intensity.avg_propane_intensity,
          ELECTRICITY: buildings_intensity.avg_diesel_oil_intensity,
          DIESEL_OIL: buildings_intensity.avg_electricity_intensity,
          NATURAL_GAS: buildings_intensity.avg_natural_gas_intensity,
        };

        (Object.keys(intensities) as Array<keyof typeof intensities>).forEach(
          (key) => {
            if (intensities[key] === 0) {
              delete intensities[key];
            }
          }
        );

        const sortedIntensities = Object.entries(intensities)
          .sort(([, a], [, b]) => b - a)
          .reduce((acc: Record<string, number>, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        return sortedIntensities;
      });

      const formattedData = mappedData
        .map((item) => {
          const total = Object.values(item).reduce(
            (acc, value) => acc + value,
            0
          );
          return Object.entries(item).map(([key, value]) => {
            return {
              name: key,
              value: value,
              percentage: Number(((value / total) * 100).toFixed(2)),
            };
          });
        })
        .flat();
      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsEnergyIntensitiesBySectorQuery", error);
  }
};
