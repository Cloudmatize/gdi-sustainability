"use client";

import { Goal } from "lucide-react";
import GoalTracker from "./goal-tracker";
import { useTargetsStore } from "@/store/targets";
import { cx } from "class-variance-authority";

export default function TargetsPage() {
  const { hypothesisMode } = useTargetsStore()
  return (
    <div className={cx("min-h-screen bg-background p-4 md:p-6 lg:px-16", hypothesisMode? "mr-12": '')}>
      <div className="mx-auto space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
              Metas <Goal className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
        </div>
        <GoalTracker />
      </div>
    </div>
  );
}
