interface TransportaionCube<T> {
  transportation_emission: T;
}
interface TransportsCubeResponse<T> {
  cube: TransportaionCube<T>[];
}

export interface TotalCO2EmissionData {
  sum_full_co2e_tons: number;
  travel_bounds: "INBOUND" | "OUTBOUND";
}

export type TotalCO2EmissionResponse =
  TransportsCubeResponse<TotalCO2EmissionData>;
