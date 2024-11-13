import {
  getTotalCO2EmissionQuery,
  getCO2EmissionByTravelBoundsQuery,
  getCO2EmissionPerKMQuery,
  getCO2EmissionByYearQuery,
} from "./queries";

import {
  TotalCO2EmissionResponse,
  CO2EmissionByTravelBoundsResponse,
  CO2EmissionByYearResponse,
  CO2EmissionPerKMResponse,
  TravelMode,
} from "@/types/transports";
import { graphQLClient } from "@/services/graphql";
import { convertTons } from "@/utils/convert-tons";

const modeMap: {
  [key in TravelMode]: string;
} = {
  AUTOMOBILE: "Carro",
  BUS: "Ônibus",
  MOTORCYCLE: "Motocicleta",
  RAIL: "Trem",
  SUBWAY: "Metrô",
  "ON FOOT": "A Pé",
  CYCLING: "Bicicleta",
  PLANE: "Avião",
};

export const getTransportsCO2Emission = async () => {
  try {
    const data = await graphQLClient.request<TotalCO2EmissionResponse>(
      getTotalCO2EmissionQuery,
      { queryName: "getTotalCO2EmissionQuery" }
    );

    if (data) {
      const outboundCO2Emission =
        data.cube.find(
          (d) => d.transportation_emission.travel_bounds === "OUTBOUND"
        )?.transportation_emission.sum_full_co2e_tons || 0;

      const inboundCO2Emission =
        data.cube.find(
          (d) => d.transportation_emission.travel_bounds === "INBOUND"
        )?.transportation_emission.sum_full_co2e_tons || 0;

      const formattedData = {
        outboundCO2Emission,
        inboundCO2Emission,
        totalCO2Emission: outboundCO2Emission + inboundCO2Emission,
      };

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};
export const getTransportsCO2EmissionByTravelBounds = async () => {
  try {
    const data = await graphQLClient.request<CO2EmissionByTravelBoundsResponse>(
      getCO2EmissionByTravelBoundsQuery,
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
                name: modeMap[mode],
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
      ).map(({ name, withinLimit, outsideLimit }) => {
        const total = withinLimit + outsideLimit;
        return {
          name,
          withinLimit: total ? Math.round((withinLimit / total) * 100) : 0,
          outsideLimit: total ? Math.round((outsideLimit / total) * 100) : 0,
        };
      });

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};

export const getTransportsCO2EmissionPerKM = async () => {
  try {
    const data = await graphQLClient.request<CO2EmissionPerKMResponse>(
      getCO2EmissionPerKMQuery,
      { queryName: "getCO2EmissionPerKMQuery" }
    );

    if (data) {
      const formattedData = data.cube.map(
        ({ graph_transportation_emission_by_mode }) => {
          return {
            mode: modeMap[graph_transportation_emission_by_mode.mode],
            emissionCO2KgPerKm: convertTons(
              graph_transportation_emission_by_mode.avg_co2e_tons_per_km,
              "kg"
            ),
          };
        }
      );

      return formattedData;
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};

export const getTransportsCO2EmissionByYear = async () => {
  try {
    const data = await graphQLClient.request<CO2EmissionByYearResponse>(
      getCO2EmissionByYearQuery,
      { queryName: "getCO2EmissionByYearQuery" }
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
            entry[modeMap[mode as TravelMode]] = resultMap[year][mode];
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
            entry[modeMap[mode as TravelMode]] !== null &&
            entry[modeMap[mode as TravelMode]] !== undefined
        );
      });

      return {
        data: formattedDataWithNulls,
        modals: filteredUniqueModes.map((mode) => modeMap[mode as TravelMode]),
      };
    }
  } catch (error) {
    console.log("Error fetching total CO2 emission", error);
  }
};
