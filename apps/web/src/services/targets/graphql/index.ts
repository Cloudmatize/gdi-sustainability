import { graphQLClient } from "@/services/graphql";
import { getCO2EmissionByYearAndModalQuery } from "@/services/transports/graphql/queries";
import { CO2EmissionByYearResponse } from "@/types/transports";

export const getTargetsCO2EmissionByModal = async () => {
  const lastYear = new Date().getFullYear() - 1;
  try {
    const query = getCO2EmissionByYearAndModalQuery({
      filters: {
        date: [lastYear],
      },
    });
    const data = await graphQLClient.request<CO2EmissionByYearResponse>(query, {
      variables: {
        queryName: "getCO2EmissionByYearAndModalQuery ( targets )",
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

      const filteredData = formattedData.filter(
        (item) => !["ON FOOT", "CYCLING"].includes(item.mode)
      );
      return filteredData;
    }
  } catch (error) {
    console.error("getCO2EmissionByYearAndModalQuery", error);
  }
};

