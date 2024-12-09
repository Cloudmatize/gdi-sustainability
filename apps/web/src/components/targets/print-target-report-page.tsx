"use client";

import { useTargetsStore } from "@/store/targets";
import { Skeleton } from "../ui/skeleton";
import GoalCard from "./goal-card";
import { CalendarClock, Target } from "lucide-react";
import { BASE_YEAR, REDUCTION_RATE, TARGET_YEAR } from "@/constants/targets";
import TargetAdherenceCard from "./target-adherence-card";
import { cx } from "class-variance-authority";
import { Progress } from "../ui/progress";

interface Props {
  componentRef: any;
  data: {
    loadingCo2EmissionByYear: boolean;
    yearBaseCo2Emission: number;
    lastYearCo2Emission: number;
    targetCo2EmissionsFinalYear: {
      targetCo2Emission: number | null;
    };
  };
}

export default function PrintTargetReportPage({
  componentRef,
  data: {
    loadingCo2EmissionByYear,
    yearBaseCo2Emission,
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
  },
}: Props) {
  const { hypothesisMode } = useTargetsStore();
  return (
    <div
    // className="hidden absolute -z-10 top-0 overflow-hidden h-screen"
    >
      {/* <div ref={componentRef} className="space-y-12 py-8"> */}
      <div
        ref={componentRef}
        className="p-6 mx-auto max-w-4xl space-y-2 text-xs  "
      >
        <div className="space-y-8 border-b pb-8">
          <div className="grid grid-cols-4 gap-16">
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-500">Ano base</div>
              <div className="text-2xl font-bold">2019</div>
              <div className=" font-semibold text-gray-900">216.820</div>
              <div className="text-xs text-gray-500">toneladas de CO₂</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-500">Meta</div>
              <div className="text-2xl font-bold">2030</div>
              <div className=" font-semibold text-emerald-600">173.456</div>
              <div className="text-xs text-gray-500">
                toneladas de CO₂ (-20%)
              </div>
            </div>

            <div className="space-y-4 col-span-2">
              <div className="space-y-1">
                <h2 className=" font-medium">
                  Índice de aderência à meta para 2030
                </h2>
                <div className=" text-gray-500 text-xs">
                  Baseado nas emissões do último ano: 193.953,478 (tCO₂e)
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className=" font-medium text-xs">Atual</div>
                  <div className="text-2xl font-bold">89.43%</div>
                </div>
                <Progress value={89.43} className="h-1" />
                <div className=" text-gray-500 text-xs">
                  da meta de redução de emissões para 2030
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
