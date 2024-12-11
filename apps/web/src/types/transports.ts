export type TravelMode =
  | "BUS"
  | "RAIL"
  | "SUBWAY"
  | "CYCLING"
  | "ON FOOT"
  | "AUTOMOBILE"
  | "MOTORCYCLE"
  | "PLANE";

interface TransportaionCube<T> {
  transportation_emission: T;
}
interface GraphTransportsCube<T> {
  graph_transportation_emission_by_mode: T;
}

interface TransportationEmissionCardsCube<T> {
  transportation_emission_cards: T;
}
interface TransportsCubeResponse<T> {
  cube: TransportaionCube<T>[];
}
interface GraphTransportsCubeResponse<T> {
  cube: GraphTransportsCube<T>[];
}

interface TransportationEmissionCardsResponse<T> {
  cube: TransportationEmissionCardsCube<T>[];
}

export interface TotalCO2EmissionData {
  sum_full_co2e_tons: number;
  travel_bounds: "INBOUND" | "OUTBOUND";
  sum_trips: number;
}
export interface CO2EmissionPerTravelBounds {
  sum_full_co2e_tons: number;
  travel_bounds: "INBOUND" | "OUTBOUND";
  mode: TravelMode;
}

export interface CO2EmissionPerKM {
  avg_co2e_tons_per_km: number;
  mode: TravelMode;
}

export interface CO2EmissionByYearAndModal {
  sum_full_co2e_tons: number;
  mode: TravelMode;
  year: number;
  sum_trips: number;
}
export interface CO2EmissionByYear {
  sum_full_co2e_tons: number;
  year: number;
}

export interface CO2EmissionModalAnalysis {
  percentage_contribution: number;
  avg_percentage_yearly: number;
  contribution_status: string;
  mode: TravelMode;
}

export type TotalCO2EmissionResponse =
  TransportsCubeResponse<TotalCO2EmissionData>;

export type CO2EmissionByTravelBoundsResponse =
  TransportsCubeResponse<CO2EmissionPerTravelBounds>;

export type CO2EmissionPerKMResponse =
  GraphTransportsCubeResponse<CO2EmissionPerKM>;

export type CO2EmissionByYearAndModalResponse =
  TransportsCubeResponse<CO2EmissionByYearAndModal>;

export type CO2EmissionByYearResponse =
  TransportsCubeResponse<CO2EmissionByYearAndModal>;

export type CO2EmissionModalAnalysisResponse =
TransportationEmissionCardsResponse<CO2EmissionModalAnalysis>;
