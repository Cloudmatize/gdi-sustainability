import { graphQLClient } from "@/services/graphql";
import { getTotalCO2EmissionQuery } from "./queries";
import { TotalCO2EmissionResponse } from "@/types/transports";

export const getTotalCO2Emission = async ({}) => {
  try {
    const data = await graphQLClient.request<TotalCO2EmissionResponse>(
      getTotalCO2EmissionQuery
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
