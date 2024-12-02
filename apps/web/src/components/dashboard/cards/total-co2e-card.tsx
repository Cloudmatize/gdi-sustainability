import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardIcons from "@/components/ui/card-icons";
import { Building2, CarFront, Scale } from "lucide-react";

interface Props {
  transportsCo2Emission: number;
  buildingsCo2Emission: number;
}
export function TotalCO2eCard({
  buildingsCo2Emission,
  transportsCo2Emission,
}: Props) {
  return (
    <Card className="border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Emissões totais (tCO2e)</CardTitle>
        <CardIcons>
          <Scale />
        </CardIcons>
      </CardHeader>
      <CardContent>
        {" "}
        <>
          <div className="text-2xl font-bold text-foreground">
            {Math.trunc(
              (transportsCo2Emission || 0) + (buildingsCo2Emission || 0)
            ).toLocaleString()}{" "}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                <CarFront size={20} className="text-primary-foreground" />
                <span className="text-sm text-muted-foreground">
                  Transportes:{" "}
                  {Math.trunc(transportsCo2Emission || 0).toLocaleString()}{" "}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={20} className="text-primary-foreground" />
              <span className="text-sm text-muted-foreground">
                Edifícios:{" "}
                {Math.trunc(buildingsCo2Emission || 0).toLocaleString()}{" "}
              </span>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
