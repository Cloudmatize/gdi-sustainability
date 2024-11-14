export type BuildingsSector = "RESIDENTIAL" | "NON-RESIDENTIAL";
export type EnergyFractions =
  | "PROPANE"
  | "ELECTRICITY"
  | "DIESEL_OIL"
  | "NATURAL_GAS";
interface BuildingsCube<T> {
  buildings: T;
}
interface BuildingsIntensityCube<T> {
  buildings_intensity: T;
}
interface BuildingsCubeResponse<T> {
  cube: BuildingsCube<T>[];
}
interface BuildingsIntensityCubeResponse<T> {
  cube: BuildingsIntensityCube<T>[];
}

export interface BuildingsFloorAreasBySector {
  sum_floor_area: number;
  sector: BuildingsSector;
  buildings: number;
  co2e_tons: number;
}

export interface BuildingsCO2EmissionsBySector {
  co2e_tons: number;
  sector: BuildingsSector;
}

export interface BuildingsEnergyFractionsBySector {
  sector: BuildingsSector;
  propane_fraction: number;
  diesel_oil_fraction: number;
  electricity_fraction: number;
  natural_gas_fraction: number;
}

export interface BuildingsEnergyIntensitiesBySector {
  avg_propane_intensity: number;
  avg_diesel_oil_intensity: number;
  avg_electricity_intensity: number;
  avg_natural_gas_intensity: number;
}

export type BuildingsFloorAreasBySectorResponse =
  BuildingsCubeResponse<BuildingsFloorAreasBySector>;

export type BuildingsCO2EmissionsBySectorResponse =
  BuildingsCubeResponse<BuildingsCO2EmissionsBySector>;

export type BuildingsEnergyFractionsBySectorResponse =
  BuildingsCubeResponse<BuildingsEnergyFractionsBySector>;

export type BuildingsEnergyIntensitiesBySectorResponse =
  BuildingsIntensityCubeResponse<BuildingsEnergyIntensitiesBySector>;
