import { TransportFilters } from "@/store/transports";
import { gql } from "graphql-request";

export const getTotalCO2EmissionQuery = ({
  filters,
}: {
  filters?: TransportFilters;
}) => gql`
  query CubeQuery {
    cube(where: { transportation_emission: { year: { equals: ${filters?.date} } } }) {
      transportation_emission {
        sum_full_co2e_tons
        travel_bounds
        sum_trips
      }
    }
  }
`;

export const getCO2EmissionByTravelBoundsQuery = ({
  filters,
}: {
  filters?: TransportFilters;
}) => gql`
  query CubeQuery {
    cube(where: { transportation_emission: { year: { equals: ${filters?.date} } } }) {
      transportation_emission {
        sum_full_co2e_tons
        travel_bounds
        mode
      }
    }
  }
`;

export const getCO2EmissionPerKMQuery = ({
  filters,
}: {
  filters?: TransportFilters;
}) => gql`
  query CubeQuery {
    cube(
      where: {
        graph_transportation_emission_by_mode: { year: { equals: ${filters?.date} } }
      }
    ) {
      graph_transportation_emission_by_mode {
        avg_co2e_tons_per_km
        mode
      }
    }
  }
`;

export const getCO2EmissionByYearAndModalQuery = gql`
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

export const getCO2EmissionByYearQuery = gql`
  query CubeQuery {
    cube {
      transportation_emission(orderBy: { year: asc }) {
        sum_full_co2e_tons
        year
      }
    }
  }
`;
