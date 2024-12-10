"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ENERGY_FRACTIONS } from "@/constants/buildings";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useBuildingsEnergyIntensitiesBySector } from "@/hooks/buildings";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    color: string;
    payload: {
      value: number;
    };
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        <div className="flex gap-2 items-center ">
          <div className="flex items-center gap-2  h-10  ">
            <div
              className="w-[14px] h-[14px] rounded-xs"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-foreground font-bold  w-24 text-center">
              {ENERGY_FRACTIONS[label as keyof typeof ENERGY_FRACTIONS]}
            </span>
          </div>
          {item.payload.value} kg/kWh
        </div>
      </div>
    );
  }

  return null;
};

export default function EnergyIntensities({ dict }: DictionaryContextType) {
  const { data, isFetching } = useBuildingsEnergyIntensitiesBySector({});
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {dict?.buildings.sections.EnergyIntensities.title}
        </h2>
        <p className="text-muted-foreground max-w-lg">
          {dict?.buildings.sections.EnergyIntensities.description}
        </p>
      </div>

      <div className="flex gap-8">
        {isFetching ? (
          <Skeleton className="h-[450px] w-full" />
        ) : (
          <Card className="p-6 w-full">
            <div className="h-[400px] ">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid />
                  <PolarAngleAxis
                    fontSize={12}
                    tickFormatter={(value: keyof typeof ENERGY_FRACTIONS) =>
                      `${ENERGY_FRACTIONS[value]}`
                    }
                    dataKey="name"
                  />
                  <Radar
                    name="Intensidade de consumo"
                    dataKey="percentage"
                    stroke="#1ba18d"
                    fill="#9aeee2"
                    fillOpacity={0.6}
                  />

                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
