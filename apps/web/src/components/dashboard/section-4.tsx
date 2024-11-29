import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENERGY_FRACTIONS } from "@/constants/buildings";
import {
  useBuildingsEnergyFractionsBySector,
  useBuildingsEnergyIntensitiesBySector,
} from "@/hooks/buildings";
import { ArrowDownUp, Droplet, Zap } from "lucide-react";
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
function getHighestCO2Emission(emissions: EmissionData[]): EmissionData {
  if (emissions.length === 0) {
    throw new Error("The emissions array is empty.");
  }

  return emissions.reduce((max, current) =>
    current.co2Emission > max.co2Emission ? current : max
  );
}

function compareEfficiency(data: EnergyData[]): {
  highest: EnergyData;
  lowest: EnergyData;
  differenceFactor: number;
} {
  if (data.length === 0) {
    throw new Error("The data array is empty.");
  }

  const highest = data.reduce((max, current) =>
    current.value > max.value ? current : max
  );
  const lowest = data.reduce((min, current) =>
    current.value < min.value ? current : min
  );

  const differenceFactor = highest.value / lowest.value;

  return {
    highest,
    lowest,
    differenceFactor,
  };
}
import CardIcons from "../ui/card-icons"

export default function DashboardSection4() {
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
  console.log("efficiencyComparison", efficiencyComparison);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Fonte de Energia</h2>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Main Contributor Card */}
        {isLoadingEnergyFractionsBySector ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Card className="border-teal-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap size={28} className=" text-teal-400" />
                Fonte Principal de Emissões de CO₂
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="text-3xl font-bold text-teal-400">
                {
                  ENERGY_FRACTIONS[
                    highestCO2Emission?.name as keyof typeof ENERGY_FRACTIONS
                  ]
                }
              </div>
              <div className="space-y-2 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Contribuição nas emissões dos edifícios
                  </span>
                  <span className="font-medium text-lg text-teal-400">
                    {((highestCO2Emission?.percentage || 0) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total de CO₂ emitido (tCO2e)
                  </span>
                  <span className="font-medium text-lg text-teal-400">
                    {Math.trunc(
                      highestCO2Emission?.co2Emission || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Efficiency Comparison Card */}
        {isLoadingEnergyIntensitiesBySector ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Card className="border-teal-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center  gap-2">
                <ArrowDownUp size={32} className=" text-teal-400" />
                Comparativo de Eficiência
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 gap-2 flex flex-col">
              <div className="text-sm text-muted-foreground">
                {
                  ENERGY_FRACTIONS[
                    efficiencyComparison?.lowest
                      .name as keyof typeof ENERGY_FRACTIONS
                  ]
                }{" "}
                tem o menor impacto por kWh com (
                {efficiencyComparison?.lowest.value} kgCO₂/kWh), sendo{" "}
                {efficiencyComparison?.differenceFactor?.toFixed(2)} vezes mais
                eficiente que{" "}
                {
                  ENERGY_FRACTIONS[
                    efficiencyComparison?.highest
                      .name as keyof typeof ENERGY_FRACTIONS
                  ]
                }{" "}
                com ({efficiencyComparison?.highest.value} kgCO₂/kWh).
              </div>
              <div className="my-2 gap-1 flex flex-col">
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-slate-800 min-w-36">
                    {
                      ENERGY_FRACTIONS[
                        efficiencyComparison?.lowest
                          .name as keyof typeof ENERGY_FRACTIONS
                      ]
                    }
                  </p>
                  <div className="flex items-center gap-1 text-teal-400">
                    <Droplet size={16} className="" />
                    <span className="font-medium">Fonte mais eficiente</span>
                  </div>
                </div>
                <div className="flex items-center ">
                  <div className="text-2xl font-bold text-slate-800 min-w-36">
                    {
                      ENERGY_FRACTIONS[
                        efficiencyComparison?.highest
                          .name as keyof typeof ENERGY_FRACTIONS
                      ]
                    }
                  </div>
                  <div className="flex items-center gap-2 text-rose-400">
                    <Zap size={16} className="" />
                    <span className="font-medium">Fonte menos eficiente</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
