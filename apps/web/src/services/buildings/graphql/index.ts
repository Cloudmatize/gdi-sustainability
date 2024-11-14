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
  const mockedData = {
    residential: {
      area: 1000,
      sector: "Residencial",
      count: 10,
    },
    nonResidential: {
      area: 2000,
      sector: "Não Residencial",
      count: 20,
    },
  };

  return mockedData;
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
        };
      });

      const formattedData = {
        residential: mappedData.find((item) => item.sector === "Residencial"),
        nonResidential: mappedData.find(
          (item) => item.sector === "Não Residencial"
        ),
      };

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsFloorAreasBySectorQuery", error);
  }
};

export const getBuildingsCO2EmissionsBySector = async ({}) => {
  const mockedData = [
    {
      co2e: 1000,
      sector: "Residencial",
      color: "#2DD4BF",
    },
    {
      co2e: 2000,
      sector: "Não Residencial",
      color: "#99F6E4",
    },
  ];
  return mockedData;
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
          color: gradientColors[index],
        };
      });

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsCO2EmissionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyFractionsBySector = async ({}) => {
  const mockedData = [
    {
      sector: "Residencial",
      propane: 0.1,
      dieselOil: 0.2,
      electricity: 0.3,
      naturalGas: 0.4,
    },
    {
      sector: "Não Residencial",
      propane: 0.1,
      dieselOil: 0.2,
      electricity: 0.3,
      naturalGas: 0.4,
    },
  ];

  return mockedData;

  try {
    const query = getBuildingsEnergyFractionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyFractionsBySectorResponse>(
        query
      );

    if (data) {
      const formattedData = data.cube.map(({ buildings }) => {
        return {
          sector: mappedSectors[buildings.sector],
          propane: buildings.propane_fraction,
          dieselOil: buildings.diesel_oil_fraction,
          electricity: buildings.electricity_fraction,
          naturalGas: buildings.natural_gas_fraction,
        };
      });

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsEnergyFractionsBySectorQuery", error);
  }
};
export const getBuildingsEnergyIntensitiesBySector = async ({}) => {
  const mockedData = [
    {
      energy: 1000,
      propane: 2000,
      dieselOil: 3000,
      electricity: 4000,
      naturalGas: 5000,
    },
  ];
  const formattedData = mockedData
    .map((item) => {
      const total = Object.values(item).reduce((acc, value) => acc + value, 0);
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

  try {
    const query = getBuildingsEnergyIntensitiesBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsEnergyIntensitiesBySectorResponse>(
        query
      );

    if (data) {
      const mappedData = data.cube.map(({ buildings_intensity }) => {
        return {
          energy: buildings_intensity.avg_energy_intensity,
          propane: buildings_intensity.avg_propane_intensity,
          dieselOil: buildings_intensity.avg_diesel_oil_intensity,
          electricity: buildings_intensity.avg_electricity_intensity,
          naturalGas: buildings_intensity.avg_natural_gas_intensity,
        };
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
