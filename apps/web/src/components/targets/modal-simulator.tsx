"use client";

import { CardContent } from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTargetsStore } from "@/store/targets";
import { ArrowDown, ArrowUp, Target } from "lucide-react";
import { MdCo2 } from "react-icons/md";

export default function ModalSimulator({ dict }: DictionaryContextType) {
  const {
    totalCo2Emission: { original, percentage, simulated },
  } = useTargetsStore();
  const percentageColor = percentage > 0 ? "text-primary-foreground" : "text-red-500";
  return (
    <div className="border-b  border-gray-200 overflow-auto">
      <CardContent className=" space-y-4 flex  items-center">
        <div className=" flex gap-12 items-center md:justify-center  w-full text-xl">
          <div className="flex items-center space-x-2">
            <div className=" w-10">
              <MdCo2 size={40} className="text-foreground" />
            </div>
            <div className="flex-col flex items-center text-center">
              <span className="font-semibold text-foreground ">
                {original.toLocaleString()} tCO2e
              </span>
              <span className="text-sm text-muted-foreground  ">
                {dict?.targets?.goalsTracker.cards.goalTrackerTable.modalSimulator.totalInitialIssuance}
              </span>
            </div>
          </div>
          <div className="flex  flex-col items-center space-x-2 ">
            <div className="flex items-center justify-center gap-2">
              {percentage > 0 ? (
                <ArrowDown className={`h-6 w-6 ${percentageColor}`} />
              ) : (
                <ArrowUp className={`h-6 w-6 ${percentageColor}`} />
              )}
              <div className="flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-semibold ${percentageColor}`}>
                  {percentage.toFixed(2)}%{" "}
                </span>
                <span className="text-sm text-muted-foreground">
                  {(simulated - original).toLocaleString()} tCO2e
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className=" w-10">
              <Target className="text-foreground" />
            </div>
            <div className="flex-col flex items-center  text-center">
              <span className="font-semibold text-foreground">
                {simulated.toLocaleString()} tCO2e
              </span>
              <span className="text-sm text-muted-foreground ">
                {dict?.targets?.goalsTracker.cards.goalTrackerTable.modalSimulator.totalExpectedIssuance}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
