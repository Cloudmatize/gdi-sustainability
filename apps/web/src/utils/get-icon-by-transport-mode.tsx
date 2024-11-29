import CardIcons from "@/components/ui/card-icons";
import {
  BikeIcon as Bicycle,
  Bike,
  Bus,
  Car,
  PersonStanding,
  Train,
} from "lucide-react";

export const getIconByTransportMode = (mode: string) => {
  switch (mode) {
    case "AUTOMOBILE":
      return <CardIcons><Car /></CardIcons>
    case "CARRO":
      return <CardIcons><Car /></CardIcons>
    case "BUS":
      return <CardIcons><Bus /></CardIcons>
    case "ÔNIBUS":
      return <CardIcons><Bus /></CardIcons>
    case "MOTORCYCLE":
      return <CardIcons><Bike /></CardIcons>
    case "MOTOCICLETA":
      return <CardIcons><Bike /></CardIcons>
    case "RAIL":
      return <CardIcons><Train /></CardIcons>
    case "TREM":
      return <CardIcons><Train /></CardIcons>
    case "ON FOOT":
      return <CardIcons><PersonStanding /></CardIcons>
    case "A PÉ":
      return <CardIcons><Train /></CardIcons>
    case "CYCLING":
      return <CardIcons><Bicycle /></CardIcons>
    case "CICLISMO":
      return <CardIcons><Bicycle /></CardIcons>
  }
};
