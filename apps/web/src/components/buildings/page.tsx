import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, Bus, Calendar, Filter, Building } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import EnergyMatrix from "./sections/energy-matrix";
import CO2IntensityByEnergySource from "./sections/co2-intensity-by-energy-source";
import CO2EmissionsMap from "./sections/co2-emissions-map";

const EmissionCard = ({
  title,
  value,
  loading,
  percentage,
  icon: Icon,
  description,
}: {
  title: string;
  value?: string | number;
  loading?: boolean;
  percentage?: string;
  description?: string;
  icon: any;
}) =>
  loading || !value ? (
    <Skeleton className="h-[200px]  rounded-xl" />
  ) : (
    <Card className="p-6">
      <div className="space-y-2 h-full flex flex-col">
        <div className="flex items- justify-between h-16 ">
          <span className="text-muted-foreground max-w-[75%]   ">{title}</span>
          <div className="rounded bg-teal-400 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-7xl font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
          {percentage && (
            <span className="text-2xl font-light text-muted-foreground mb-1">
              ({percentage})
            </span>
          )}
        </span>
        {description && (
          <span className="pt-2 px-2 font-semibold text-slate-600">
            {description}
          </span>
        )}
      </div>
    </Card>
  );

export default function BuildingsPage() {
  const isFetching = false;
  return (
    <div className="min-h-screen bg-background p-6 mx-16">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-slate-700 hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
              Emissões de edifícios <Building className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              2024
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          As informações sobre emissões de CO2 dos edifícios auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>

        <div className="border-t border-gray-200 py-6" />
        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <EmissionCard
            icon={Building}
            loading={isFetching}
            title="Total de edifícios do município"
            value={"842mil"}
            percentage={"100%"}
            description="área de 200.000m²"
          />
          <EmissionCard
            icon={Building}
            loading={isFetching}
            title="Edifícios residenciais"
            value={"142mil"}
            description="área de 45.000m²"
            percentage={"30%"}
          />

          <EmissionCard
            icon={Building}
            loading={isFetching}
            title="Edifícios não residenciais"
            value={"700mil"}
            description="área de 155.000m²"
            percentage={"70%"}
          />
        </div>
        <CO2EmissionsMap />
        <EnergyMatrix />
        <CO2IntensityByEnergySource />
      </div>
    </div>
  );
}
