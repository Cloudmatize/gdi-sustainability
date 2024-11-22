"use client";

import { Card } from "../ui/card";
interface GoalCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subLabel: string;
  subValue: string;
  subUnit: string;
}

export default function GoalCard({
  icon: Icon,
  title,
  value,
  subLabel,
  subValue,
  subUnit,
}: GoalCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className={` p-4`}>
        <div className="flex items-center gap-2 text-slate-700">
          <Icon className="h-6 w-6" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="p-5 pt-0 space-y-5">
        <p className="text-2xl font-bold text-slate-700">{value}</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            {subLabel}
          </p>
          <p className="text-xl font-bold text-teal-500">
            {subValue}{" "}
            <span className="text-base font-normal text-slate-600">
              {subUnit}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}
