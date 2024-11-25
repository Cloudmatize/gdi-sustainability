import {
  Bike,
  Bus,
  Car,
  PersonStanding,
  Train,
  BikeIcon as Bicycle,
} from "lucide-react";

export const getIconByTransportMode = (mode: string) => {
  switch (mode) {
    case "AUTOMOBILE":
      return <Car className="h-4 w-4" />;
    case "BUS":
      return <Bus className="h-4 w-4" />;
    case "MOTORCYCLE":
      return <Bike className="h-4 w-4" />;
    case "RAIL":
      return <Train className="h-4 w-4" />;
    case "ON FOOT":
      return <PersonStanding className="h-4 w-4" />;
    case "CYCLING":
      return <Bicycle className="h-4 w-4" />;
  }
};
