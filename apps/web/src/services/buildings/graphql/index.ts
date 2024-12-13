import { graphQLClient } from "@/services/graphql";
import {
  getBuildingsCO2EmissionsBySectorQuery,
  getBuildingsEnergyFractionsBySectorQuery,
  getBuildingsEnergyIntensitiesBySectorQuery,
  getBuildingsFloorAreasBySectorQuery,
} from "./queries";

import type {
  BuildingsCO2EmissionsBySectorResponse,
  BuildingsEnergyFractionsBySectorResponse,
  BuildingsEnergyIntensitiesBySectorResponse,
  BuildingsFloorAreasBySectorResponse,
} from "@/types/buildings";

import { gradientColors } from "@/config/colors";

export const getBuildingsFloorAreasBySector = async ({}) => {
  try {
    const query = getBuildingsFloorAreasBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsFloorAreasBySectorResponse>(query, {
        queryName: "getBuildingsFloorAreasBySectorQuery",
      });

    if (data && data?.cube?.length > 0) {
      const mappedData = data.cube.map(({ buildings }) => {
        return {
          area: buildings.sum_floor_area,
          sector: buildings.sector,
          count: buildings.buildings || 0,
          co2e_tons: buildings.co2e_tons,
        };
      });
      const residential = mappedData.find((d) => d.sector === "RESIDENTIAL");
      const nonResidential = mappedData.find(
        (d) => d.sector === "NON-RESIDENTIAL"
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
    return null;
  } catch (error) {
    console.error("getBuildingsFloorAreasBySectorQuery", error);
  }
};

export const getBuildingsCO2EmissionsBySector = async ({}) => {
  try {
    const query = getBuildingsCO2EmissionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsCO2EmissionsBySectorResponse>(
        query,
        {
          queryName: "getBuildingsCO2EmissionsBySectorQuery",
        }
      );

    if (data && data?.cube?.length > 0) {
      const formattedData = data.cube.map(({ buildings }, index) => {
        return {
          co2e: buildings.co2e_tons,
          sector: buildings.sector,
          color: index === 0 ? gradientColors[0] : gradientColors[2],
        };
      });

      return formattedData;
    }
    return null;
  } catch (error) {
    console.error("getBuildingsCO2EmissionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyFractionsBySector = async ({}) => {
  try {
    const query = getBuildingsEnergyFractionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyFractionsBySectorResponse>(
        query
      );

    if (data && data?.cube?.length > 0) {
      const energyFractions = data?.cube?.map(({ buildings }) => {
        const fractions = {
          PROPANE: buildings.propane_fraction,
          ELECTRICITY: buildings.diesel_oil_fraction,
          DIESEL_OIL: buildings.electricity_fraction,
          NATURAL_GAS: buildings.natural_gas_fraction,
        };

        (Object.keys(fractions) as Array<keyof typeof fractions>).map(
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
          sector: buildings.sector,
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

    return null;
  } catch (error) {
    console.error("getBuildingsEnergyFractionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyIntensitiesBySector = async ({}) => {
  try {
    const query = getBuildingsEnergyIntensitiesBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyIntensitiesBySectorResponse>(
        query
      );

    if (data && data?.cube?.length > 0) {
      const mappedData = data.cube.map(({ buildings_intensity }) => {
        const intensities = {
          PROPANE: buildings_intensity.avg_propane_intensity,
          ELECTRICITY: buildings_intensity.avg_diesel_oil_intensity,
          DIESEL_OIL: buildings_intensity.avg_electricity_intensity,
          NATURAL_GAS: buildings_intensity.avg_natural_gas_intensity,
        };

        (Object.keys(intensities) as Array<keyof typeof intensities>).map(
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
        .flatMap((item) => {
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
        });
      return formattedData;
    }

    return null;
  } catch (error) {
    console.error("getBuildingsEnergyIntensitiesBySectorQuery", error);
  }
};
