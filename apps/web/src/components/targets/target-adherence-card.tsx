"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TrendingDown, Target } from "lucide-react";
import { useTargetsStore } from "@/store/targets";

interface Props {
  targetEmissions: number;
  baseEmissions: number;
  targetYear: number;
}
export default function TargetAdherenceCard({
  targetEmissions,
  baseEmissions,
  targetYear,
}: Props) {
  const { hypothesisMode, totalCo2Emission } = useTargetsStore();
  const { simulated: simulatedEmissions } = totalCo2Emission;

  const baseAdherence = (targetEmissions / baseEmissions) * 100;
  const simulatedAdherence = (targetEmissions / simulatedEmissions) * 100;
  return (
    <Card className="w-full h-full ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold flex flex-col">
          Índice de aderência à meta para {targetYear}
          <span className="text-sm font-medium text-muted-foreground">
            Baseado nas emissões do último ano: {baseEmissions.toLocaleString()}{" "}
            tCO₂
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className=" py-3">
        <div className=" flex items-center justify-center gap-12 h-20  ">
          <div className="w-full space-y-2  h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">Atual</span>
              </div>
              <span className="text-2xl font-bold text-slate-700">
                {baseAdherence.toFixed(2)}%
              </span>
            </div>
            <Progress
              value={Math.min(baseAdherence, 100)}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-teal-500"
            />
            <div className="text-xs text-muted-foreground">
              da meta de redução de emissões para {targetYear}
            </div>
          </div>

          {hypothesisMode && (
            <div className="space-y-2 w-full h-full ">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-slate-700" />
                  <span className="font-medium text-slate-700">Simulado</span>
                </div>
                <span className="text-2xl font-bold text-slate-700">
                  {simulatedAdherence.toFixed(2)}%
                </span>
              </div>
              <Progress
                indicatorClassName="bg-violet-700"
                value={Math.min(simulatedAdherence, 100)}
                className="h-2 bg-gray-100"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Emissões simuladas: {simulatedEmissions.toLocaleString()} tCO₂
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
