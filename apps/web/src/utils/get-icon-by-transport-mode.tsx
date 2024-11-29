import CardIcons from "@/components/ui/card-icons";
import {
  BikeIcon as Bicycle,
  Bike,
  Bus,
  Car,
  PersonStanding,
  Train,
} from "lucide-react";

export const getIconByTransportMode = (mode: string, asChild = false) => {
  switch (mode) {
    case "AUTOMOBILE":
      return <CardIcons asChild={asChild}><Car /></CardIcons>
    case "CARRO":
      return <CardIcons asChild={asChild}><Car /></CardIcons>
    case "BUS":
      return <CardIcons asChild={asChild}><Bus /></CardIcons>
    case "ÔNIBUS":
      return <CardIcons asChild={asChild}><Bus /></CardIcons>
    case "MOTORCYCLE":
      return <CardIcons asChild={asChild}><Bike /></CardIcons>
    case "MOTOCICLETA":
      return <CardIcons asChild={asChild}><Bike /></CardIcons>
    case "RAIL":
      return <CardIcons asChild={asChild}><Train /></CardIcons>
    case "TREM":
      return <CardIcons asChild={asChild}><Train /></CardIcons>
    case "ON FOOT":
      return <CardIcons asChild={asChild}><PersonStanding /></CardIcons>
    case "A PÉ":
      return <CardIcons asChild={asChild}><Train /></CardIcons>
    case "CYCLING":
      return <CardIcons asChild={asChild}><Bicycle /></CardIcons>
    case "CICLISMO":
      return <CardIcons asChild={asChild}><Bicycle /></CardIcons>
  }
};
