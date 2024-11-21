import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Bus,
  Bike,
  Train,
  PersonStanding,
  BikeIcon as Bicycle,
} from "lucide-react";

interface TransportMode {
  mode: string;
  co2Emissions: number;
  trips: number;
}

const mockData: TransportMode[] = [
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

const formatNumber = (num: number) => {
  return num.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
};

interface Props {
  data: TransportMode[];
}
export default function TransportStats2({ data }: Props) {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Estatísticas de Transporte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data?.map((item) => (
            <div key={item.mode} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getIcon(item.mode)}</div>
              <div className="flex-grow">
                <div className="font-medium">
                  {item.mode.charAt(0) + item.mode.slice(1).toLowerCase()}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-lg text-slate-700">
                    {formatNumber(item.co2Emissions)}
                  </span>{" "}
                  ton CO₂ | {formatNumber(item.trips)} viagens
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
