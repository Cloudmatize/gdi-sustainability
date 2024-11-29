import { BuildingsSector, EnergyFractions } from "@/types/buildings";

export const mappedSectors: {
  [key in BuildingsSector]: string;
} = {
  "NON-RESIDENTIAL": "Não Residencial",
  RESIDENTIAL: "Residencial",
};

export const ENERGY_FRACTIONS: {
  [key in EnergyFractions]: string;
} = {
  PROPANE: "Propano",
  ELECTRICITY: "Eletricidade",
  DIESEL_OIL: "Óleo Diesel",
  NATURAL_GAS: "Gás Natural",
};
