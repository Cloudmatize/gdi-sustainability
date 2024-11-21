import { Card, CardContent } from "@/components/ui/card";
import {
  Car,
  Bus,
  Bike,
  Train,
  PersonStandingIcon as Person,
  BikeIcon as Bicycle,
} from "lucide-react";

interface TransportMode {
  mode: string;
  co2Emissions: number;
  trips: number;
}

const data: TransportMode[] = [
  { mode: "AUTOMOBILE", co2Emissions: 145209.7936, trips: 99367062 },
  { mode: "BUS", co2Emissions: 42096.111099999995, trips: 6814228 },
  { mode: "MOTORCYCLE", co2Emissions: 6647.573200000001, trips: 11024994 },
  { mode: "RAIL", co2Emissions: 0, trips: 5642438 },
  { mode: "ON FOOT", co2Emissions: 0, trips: 49430651 },
  { mode: "CYCLING", co2Emissions: 0, trips: 1846398 },
];

const getIcon = (mode: string) => {
  switch (mode) {
    case "AUTOMOBILE":
      return <Car className="h-6 w-6" />;
    case "BUS":
      return <Bus className="h-6 w-6" />;
    case "MOTORCYCLE":
      return <Bike className="h-6 w-6" />;
    case "RAIL":
      return <Train className="h-6 w-6" />;
    case "ON FOOT":
      return <Person className="h-6 w-6" />;
    case "CYCLING":
      return <Bicycle className="h-6 w-6" />;
  }
};

const formatEmissions = (emissions: number) => {
  const millions = emissions / 1000000;
  return `${millions.toFixed(2)}M`;
};

interface Props {
  data: TransportMode;
}
export default function TransportStatsCard({ data }: Props) {
  return (
    <Card key={data?.mode} className="relative overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex datas-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium">
              {data?.mode?.charAt(0) + data?.mode?.slice(1)?.toLowerCase()}
            </h3>
           
          </div>
          <div className="text-muted-foreground">{getIcon(data?.mode)}</div>
        </div>
        <p className="text-2xl font-bold">
              {formatEmissions(data?.co2Emissions)}
            </p>
        <p className="text-xs text-muted-foreground">
          Total de viagens: {data?.trips?.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
