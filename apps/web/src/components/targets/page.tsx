"use client";

import { Goal } from "lucide-react";
import GoalTracker from "./goal-tracker";

export default function TargetsPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:mx-16">
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
