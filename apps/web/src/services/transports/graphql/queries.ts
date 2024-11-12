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

export const getCO2EmissionByTravelBoundsQuery = gql`
  query CubeQuery {
    cube {
      transportation_emission(orderBy: { sum_full_co2e_tons: desc }) {
        sum_full_co2e_tons
        travel_bounds
        mode
      }
    }
  }
`;

export const getCO2EmissionPerKMQuery = gql`
  query CubeQuery {
    cube {
      graph_transportation_emission_by_mode(
        orderBy: { avg_co2e_tons_per_km: desc }
      ) {
        avg_co2e_tons_per_km
        mode
      }
    }
  }
`;

export const getCO2EmissionByYearQuery = gql`
  query CubeQuery {
    cube {
      transportation_emission(orderBy: { sum_full_co2e_tons: desc }) {
        sum_full_co2e_tons
        mode
        year
      }
    }
  }
`;
