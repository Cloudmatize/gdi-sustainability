"use client";

import { useTargetsStore } from "@/store/targets";
import { cx } from "class-variance-authority";
import { Goal } from "lucide-react";
import GoalTracker from "./goal-tracker";

export interface TargetsPageProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  dict: any
}


export default function TargetsPage({ dict }: TargetsPageProps) {
  const { hypothesisMode } = useTargetsStore()
  return (
    <div className={cx("min-h-screen bg-background p-4 md:p-6 lg:px-16", hypothesisMode ? "mr-12" : '')}>
      <div className="mx-auto space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
              {dict.targets.title} <Goal className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
        </div>
        <GoalTracker dict={dict} />
      </div>
    </div>
  );
}
