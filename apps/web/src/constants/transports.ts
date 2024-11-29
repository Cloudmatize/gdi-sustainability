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



export const passengersPerTripMapping: { [key: string]: number } = {
  AUTOMOBILE: 1.5,
  BUS: 40,
  MOTORCYCLE: 1,
  RAIL: 1000,
  "ON FOOT": 1,
  CYCLING: 1,
};
