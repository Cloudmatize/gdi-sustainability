import { ArrowLeft, Bus, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const EmissionCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="p-6">
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex items- justify-between h-16 ">
        <span className="text-muted-foreground max-w-[75%]  ">{title}</span>
        <div className="rounded bg-teal-400 py-3 px-3">
          <span className="font-bold text-sm text-white">CO₂</span>
        </div>
      </div>
      <span className="text-7xl font-bold h-full text-teal-400 flex items-center">
        {value}
      </span>
    </div>
  </Card>
);

export default function BuildingsPage() {
  return (
    <div className="min-h-screen bg-background p-6 mx-16">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-slate-800 hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              Emissões de transporte <Bus className="h-7 w-7 ml-1 mt-0.5" />
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
          As informações sobre emissões de CO2 no transporte auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>

        <div className="border-t border-gray-200 py-6" />

        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <EmissionCard title="Emissão total de CO₂" value="90t" />
          <EmissionCard
            title="Emissão total de CO2 dentro da fronteira"
            value="32t"
          />
        </div>
      </div>
    </div>
  );
}
