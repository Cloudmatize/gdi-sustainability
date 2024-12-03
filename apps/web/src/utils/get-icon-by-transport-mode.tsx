import CardIcons from "@/components/ui/card-icons";
import {
  BikeIcon as Bicycle,
  Bike,
  Bus,
  Car,
  PersonStanding,
  Train,
} from "lucide-react";

export const getIconByTransportMode = ({
  mode,
  asChild = false,
  className,
}: {
  mode: string;
  asChild?: boolean;
  className?: string;
}) => {
  switch (mode) {
    case "AUTOMOBILE":
    case "CARRO":
      return (
        <CardIcons className={className} asChild={asChild}>
          <Car />
        </CardIcons>
      );
    case "BUS":
    case "ÔNIBUS":
      return (
        <CardIcons className={className} asChild={asChild}>
          <Bus />
        </CardIcons>
      );

    case "MOTORCYCLE":
    case "MOTOCICLETA":
      return (
        <CardIcons className={className} asChild={asChild}>
          <Bike />
        </CardIcons>
      );

    case "RAIL":
    case "TREM":
      return (
        <CardIcons className={className} asChild={asChild}>
          <Train />
        </CardIcons>
      );

    case "ON FOOT":
    case "A PÉ":
      return (
        <CardIcons className={className} asChild={asChild}>
          <PersonStanding />
        </CardIcons>
      );

    case "CYCLING":
    case "CICLISMO":
      return (
        <CardIcons className={className} asChild={asChild}>
          <Bicycle />
        </CardIcons>
      );
  }
};
