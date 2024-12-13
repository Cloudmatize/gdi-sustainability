"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTargetsStore } from "@/store/targets";
import { Target, TrendingDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  targetEmissions: number;
  baseEmissions: number;
  targetYear: number;
  dict: DictionaryContextType['dict']
}
export default function TargetAdherenceCard({
  targetEmissions,
  baseEmissions,
  targetYear,
  dict
}: Props) {
  const { hypothesisMode, totalCo2Emission } = useTargetsStore();
  const { simulated: simulatedEmissions } = totalCo2Emission;

  const baseAdherence = (targetEmissions / baseEmissions) * 100;
  const simulatedAdherence = (targetEmissions / simulatedEmissions) * 100;
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold flex flex-col">
          {dict?.targets?.goalsTracker.cards.targetAdherence.title} {targetYear}
          <span className="text-sm font-medium text-muted-foreground">
            {dict?.targets?.goalsTracker.cards.targetAdherence.description} {baseEmissions.toLocaleString()}{" "}
            (tCO2e)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className=" py-3 ">
        <div className=" flex items-center flex-col md:flex-row justify-center gap-3 md:gap-12 ">
          <div className="w-full space-y-2  h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary-foreground" />
                <span className="font-medium">{dict?.targets?.goalsTracker.cards.targetAdherence.contentTitle} </span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {baseAdherence?.toFixed(2) ?
                  (<>{baseAdherence.toFixed(2)}%</>)
                  : (
                    <Skeleton className="w-24 h-8 flex flex-row justify-end">
                      %
                    </Skeleton>
                  )}
              </span>
            </div>
            {baseAdherence ? (<Progress
              value={Math.min(baseAdherence, 100)}
              className="h-2 bg-primary"
              indicatorClassName="bg-primary-foreground"
            />) : (
              <Skeleton className="w-full h-2">
              </Skeleton>
            )}


            <div className="text-xs text-muted-foreground">
              {dict?.targets?.goalsTracker.cards.targetAdherence.content} {targetYear}
            </div>
          </div>

          {hypothesisMode && (
            <div className="space-y-2 w-full h-full ">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-foreground" />
                  <span className="font-medium text-foreground">{dict?.targets?.goalsTracker.cards.targetAdherence.footerTitle}</span>
                </div>
                <span className="text-2xl font-bold text-foreground">
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
                  {dict?.targets?.goalsTracker.cards.targetAdherence.footer} {simulatedEmissions.toLocaleString()} tCO₂
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
