import { TravelMode } from "@/types/transports";

export const mappedTravelMode: {
  [key in TravelMode]: string;
} = {
  AUTOMOBILE: "Carro",
  BUS: "Ônibus",
  MOTORCYCLE: "Motocicleta",
  RAIL: "Trem",
  SUBWAY: "Metrô",
  "ON FOOT": "A Pé",
  CYCLING: "Bicicleta",
  PLANE: "Avião",
};
