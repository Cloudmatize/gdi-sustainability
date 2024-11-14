import { BuildingsSector } from "@/types/buildings";

export const mappedSectors: {
  [key in BuildingsSector]: string;
} = {
  "NON-RESIDENTIAL": "Não Residencial",
  RESIDENTIAL: "Residencial",
};
