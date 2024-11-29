import { TravelMode } from "@/types/transports";

export const mappedTravelMode: {
  [key in TravelMode]: string;
} = {
  AUTOMOBILE: "Automóvel",
  BUS: "Ônibus",
  MOTORCYCLE: "Motocicleta",
  RAIL: "Trem",
  SUBWAY: "Metrô",
  "ON FOOT": "A pé",
  CYCLING: "Ciclismo",
  PLANE: "Avião",
};
