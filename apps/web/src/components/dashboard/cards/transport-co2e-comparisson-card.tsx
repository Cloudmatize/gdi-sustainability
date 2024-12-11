import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";

export type Co2ComparissonCardProps = {

  mode: string;
  firstYear: {
    year: number;
    co2Emissions: number;
  };
  secondYear: {
    year: number;
    co2Emissions: number;
  };
  description: string;

};

export default function TransportCo2eComparissonCard(
  { emission, dict }: {
    emission: Co2ComparissonCardProps,
    dict: DictionaryContextType['dict']
  }
) {
  return (
    <Card key={emission.mode} className="border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle> {dict?.mappedTravelMode[emission.mode]}</CardTitle>
        {getIconByTransportMode({ mode: emission.mode })}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-4 text-xl md:text-2xl 2xl:text-3xl">
          <div className="text-center">
            <div className=" font-bold text-primary-foreground">
              {emission.firstYear.co2Emissions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.firstYear.year}
            </div>
          </div>
          <div className="text-2xl md:text-xl text-muted-foreground">×</div>
          <div className="text-center">
            <div className=" font-bold text-primary-slate">
              {emission.secondYear.co2Emissions.toLocaleString()}
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
