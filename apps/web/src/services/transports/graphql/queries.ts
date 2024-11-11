import { gql } from "graphql-request";

export const getTotalCO2EmissionQuery = gql`
  query CubeQuery {
    cube {
      transportation_emission {
        sum_full_co2e_tons
        travel_bounds
      }
    }
  }
`;
