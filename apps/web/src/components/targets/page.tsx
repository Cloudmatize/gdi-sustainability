"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Goal } from "lucide-react";
import Link from "next/link";
import GoalTracker from "./goal-tracker";

export default function TargetsPage() {
  return (
    <div className="min-h-screen bg-background p-6 mx-16">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-foreground hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
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
