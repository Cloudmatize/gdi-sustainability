import { gql } from "graphql-request";

export const getBuildingsFloorAreasBySectorQuery = ({}: {}) => gql`
  query CubeQuery {
    cube {
      buildings {
        sum_floor_area
        sector
        buildings
        co2e_tons
      }
    }
  }
`;
export const getBuildingsCO2EmissionsBySectorQuery = ({}: {}) => gql`
  query CubeQuery {
    cube {
      buildings {
        co2e_tons
        sector
      }
    }
  }
`;
export const getBuildingsEnergyFractionsBySectorQuery = ({}: {}) => gql`
  query CubeQuery {
    cube {
      buildings {
        sector
        propane_fraction
        diesel_oil_fraction
        electricity_fraction
        natural_gas_fraction
        co2e_tons
      }
    }
  }
`;
export const getBuildingsEnergyIntensitiesBySectorQuery = ({}: {}) => gql`
  query CubeQuery {
    cube {
      buildings_intensity {
        avg_propane_intensity
        avg_diesel_oil_intensity
        avg_electricity_intensity
        avg_natural_gas_intensity
      }
    }
  }
`;
