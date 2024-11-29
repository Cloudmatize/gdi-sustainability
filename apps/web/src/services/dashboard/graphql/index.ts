import { graphQLClient } from "@/services/graphql";
import {
  getCO2EmissionByYearAndModalQuery,
  getSumCo2Emissions,
} from "@/services/transports/graphql/queries";

import { getBuildingsCO2EmissionsBySectorQuery } from "@/services/buildings/graphql/queries";
import { TransportFilters } from "@/store/transports";
import {
  CO2EmissionByYearResponse,
  TotalCO2EmissionResponse,
} from "@/types/transports";
import { BuildingsCO2EmissionsBySectorResponse } from "@/types/buildings";
import { mappedSectors } from "@/constants/buildings";

export const getDashboardCO2EmissionByModal = async ({
  filters,
}: {
  filters?: TransportFilters;
}) => {
  try {
    const query = getCO2EmissionByYearAndModalQuery({ filters });
    const data = await graphQLClient.request<CO2EmissionByYearResponse>(query, {
      variables: {
        queryName: "(dashboard):getCO2EmissionByYearAndModalQuery (",
      },
    });

    if (data) {
      const formattedData = data.cube.map(({ transportation_emission }) => {
        return {
          mode: transportation_emission.mode,
          co2Emissions: transportation_emission.sum_full_co2e_tons,
          trips: transportation_emission.sum_trips,
        };
      });

      const filteredData = formattedData.filter((item) =>
        ["AUTOMOBILE", "BUS", "MOTORCYCLE"].includes(item.mode)
      );
      return filteredData;
    }
  } catch (error) {
    console.error("(dashboard):getCO2EmissionByYearAndModalQuery ", error);
  }
};

export const getDashboardTransportsCo2TotalEmission = async ({
  filters,
}: {
  filters?: TransportFilters;
}) => {
  try {
    const query = getSumCo2Emissions({
      filters,
    });
    const data = await graphQLClient.request<TotalCO2EmissionResponse>(query, {
      queryName: "(dashboard):getDashboardTransportsCo2TotalEmission",
    });

    if (data) {
      const formattedData = data.cube.map(({ transportation_emission }) => {
        return {
          totalCO2Emission: transportation_emission.sum_full_co2e_tons,
        };
      });

      return formattedData[0];
    }
  } catch (error) {
    console.error("getCO2EmissionByYearAndModalQuery", error);
  }
};

export const getDashboardBuildingsCo2TotalEmission = async ({}) => {
  try {
    const query = getBuildingsCO2EmissionsBySectorQuery({});
    const data =
      await graphQLClient.request<BuildingsCO2EmissionsBySectorResponse>(
        query,
        {
          queryName: "(dashboard):getBuildingsCO2EmissionsBySectorQuery",
        }
      );

    if (data) {
      const totalCO2Emission = data.cube.reduce((sum, { buildings }) => {
        return sum + buildings.co2e_tons;
      }, 0);

      const formattedData = { totalCO2Emission };

      return formattedData;
    }
  } catch (error) {
    console.error("getBuildingsCO2EmissionsBySectorQuery", error);
  }
};

