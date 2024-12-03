import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mappedTravelMode } from "@/constants/transports";
import { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";

export type Co2EmissionPerPassengerComparissonCardProps = {
  mode: string;
  firstYear: {
    year: number;
    emissionsPerPassenger: number;
  };
  secondYear: {
    year: number;
    emissionsPerPassenger: number;
  };
  description: string;
};

export default function TransportEmissionPerPassengerCard(
  emission: Co2EmissionPerPassengerComparissonCardProps
) {
  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle> {mappedTravelMode[emission.mode as TravelMode]}</CardTitle>
        {getIconByTransportMode({ mode: emission.mode })}
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-foreground">
              {emission.firstYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.firstYear.year}
            </div>
          </div>
          <div className="text-2xl md:text-xl text-muted-foreground">×</div>
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-slate">
              {emission.secondYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.secondYear.year}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {emission.description}
        </div>
      </CardContent>
    </Card>
  );
}
