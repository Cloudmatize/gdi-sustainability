import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import {
  useBuildingsEnergyFractionsBySector,
  useBuildingsEnergyIntensitiesBySector,
} from "@/hooks/buildings";
import { ArrowDownUp, Droplet, Zap } from "lucide-react";
import Link from "next/link";
import CardIcons from "../ui/card-icons";
import { Skeleton } from "../ui/skeleton";

type EmissionData = {
  name: any;
  co2Emission: number;
  percentage: number;
};

type EnergyData = {
  name: string;
  value: number;
  percentage: number;
};
function getHighestCO2Emission(emissions: EmissionData[] = []): EmissionData {
  if (emissions.length === 0) {
    return {
      name: "",
      co2Emission: 0,
      percentage: 0,
    };
  }

  return emissions?.reduce((max, current) =>
    current?.co2Emission > max?.co2Emission ? current : max
  );
}

function compareEfficiency(data: EnergyData[] = []): {
  highest: EnergyData;
  lowest: EnergyData;
  differenceFactor: number;
} {
  if (data.length === 0) {
    return {
      highest: { name: "", value: 0, percentage: 0 },
      lowest: { name: "", value: 0, percentage: 0 },
      differenceFactor: 0,
    };
  }

  const highest = data?.reduce((max, current) =>
    current?.value > max?.value ? current : max
  );
  const lowest = data?.reduce((min, current) =>
    current?.value < min?.value ? current : min
  );

  const differenceFactor = highest?.value / lowest?.value;

  return {
    highest,
    lowest,
    differenceFactor,
  };
}

export default function DashboardSection3({ dict }: DictionaryContextType['dict']) {
  const {
    data: energyFractionsBySector,
    isFetching: isLoadingEnergyFractionsBySector,
  } = useBuildingsEnergyFractionsBySector({});
  const {
    data: energyIntensitiesBySector,
    isFetching: isLoadingEnergyIntensitiesBySector,
  } = useBuildingsEnergyIntensitiesBySector({});

  const highestCO2Emission = energyFractionsBySector
    ? getHighestCO2Emission(energyFractionsBySector.totalEmissionCO2ByFraction)
    : null;

  const efficiencyComparison = energyIntensitiesBySector
    ? compareEfficiency(energyIntensitiesBySector)
    : null;


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{dict?.dashboard?.thirdSection?.title}</h2>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Main Contributor Card */}
        {isLoadingEnergyFractionsBySector ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Link href="/buildings" className="card-hover rounded-full">
            <Card className="border card-hove h-full ">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CardIcons>
                    <Zap />
                  </CardIcons>
                  {dict?.dashboard?.thirdSection?.cards?.highestCO2Emission?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4 ">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {
                    dict?.ENERGY_FRACTIONS[
                    highestCO2Emission?.name as string
                    ]
                  }
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {dict?.dashboard?.thirdSection?.cards?.highestCO2Emission?.content[0]}
                    </span>
                    <span className="font-bold text-end text-lg text-primary-foreground">
                      {((highestCO2Emission?.percentage || 0) * 100).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {dict?.dashboard?.thirdSection?.cards?.highestCO2Emission?.content[1]}
                    </span>
                    <span className="font-bold text-lg text-primary-foreground">
                      {Math.trunc(
                        highestCO2Emission?.co2Emission || 0
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Efficiency Comparison Card */}
        {isLoadingEnergyIntensitiesBySector ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Link href={"/buildings"}>
            <Card className="border h-full card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center  gap-2">
                  <CardIcons>
                    <ArrowDownUp />
                  </CardIcons>
                  {dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-2 gap-2 flex flex-col ">
                <div className="my-2 gap-1 flex flex-col">
                  <div className="flex items-center">
                    <p className="text-xl font-bold text-foreground min-w-36">
                      {
                        dict?.ENERGY_FRACTIONS[
                        efficiencyComparison?.lowest.name as string
                        ]
                      }
                    </p>
                    <div className="flex items-center gap-1 text-primary-foreground">
                      <Droplet size={16} className="" />
                      <span className="font-medium">
                        {dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.content[0]}</span>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <div className="text-xl font-bold text-foreground min-w-36">
                      {
                        dict?.ENERGY_FRACTIONS[
                        efficiencyComparison?.highest.name as string
                        ]
                      }
                    </div>
                    <div className="flex items-center gap-2 text-destructive-foreground">
                      <Zap size={16} className="" />
                      <span className="font-medium">{dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.content[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  {
                    dict?.ENERGY_FRACTIONS[
                    efficiencyComparison?.lowest.name as string
                    ]
                  }
                  {" "}
                  {dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.content[2]} (
                  {efficiencyComparison?.lowest.value} kgCO₂/kWh), {dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.content[3]}{" "}
                  {efficiencyComparison?.differenceFactor?.toFixed(2)} {dict?.dashboard?.thirdSection?.cards?.efficiencyComparison?.content[4]}{" "}
                  {
                    dict?.ENERGY_FRACTIONS[
                    efficiencyComparison?.highest.name as string
                    ]
                  }{" "}
                  com ({efficiencyComparison?.highest.value} kgCO₂/kWh).
                </CardDescription>
              </CardFooter>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}
