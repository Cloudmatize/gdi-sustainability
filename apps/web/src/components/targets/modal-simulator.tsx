"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTargetsStore } from "@/store/targets";
import { ArrowDown, Target, ArrowUp } from "lucide-react";
import { MdCo2 } from "react-icons/md";

export default function ModalSimulator() {
  const {
    totalCo2Emission: { original, percentage, simulated },
  } = useTargetsStore();
  const percentageColor = percentage > 0 ? "text-teal-500" : "text-red-500";
  return (
    <div className="w-full border-b  border-gray-200">
      <CardContent className=" space-y-4 flex  items-center">
        <div className=" flex gap-12 items-center justify-center  w-full text-xl">
          <div className="flex items-center space-x-2">
            <div className=" w-10">
              <MdCo2 size={40} className="text-slate-700" />
            </div>
            <div className="flex-col flex items-center">
              <span className="font-semibold text-slate-700">
                {original.toLocaleString()} tCo2
              </span>
              <span className="text-sm text-muted-foreground ">
                total de emissão inicial
              </span>
            </div>
          </div>
          <div className="flex  flex-col items-center space-x-2 ">
            <div className="flex items-center gap-2">
              {percentage > 0 ? (
                <ArrowDown className={`h-6 w-6 ${percentageColor}`} />
              ) : (
                <ArrowUp className={`h-6 w-6 ${percentageColor}`} />
              )}
              <span className={`text-3xl font-semibold ${percentageColor}`}>
                {percentage.toFixed(2)}%
              </span>
            </div>
            <span className="text-muted-foreground text-sm">
              percentual de {percentage > 0 ? "redução" : "aumento"}
            </span>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className=" w-10">
              <Target className="text-slate-700" />
            </div>
            <div className="flex-col flex items-center ">
              <span className="font-semibold text-slate-700">
                {simulated.toLocaleString()} tCo2
              </span>
              <span className="text-sm text-muted-foreground ">
                total de emissão prevista
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
