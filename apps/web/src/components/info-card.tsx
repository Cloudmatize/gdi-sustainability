import React from "react";
import { formatNumber } from "@/utils/format-number";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

interface InfoCardProps {
  title: string;
  value?: string | number;
  loading?: boolean;
  percentage?: string | number;
  description?: string;
  icon: React.ElementType;
}

export function InfoCard({
  title,
  value,
  loading,
  percentage,
  icon: Icon,
  description,
}: InfoCardProps) {
  return loading || !value ? (
    <Skeleton className="h-[230px] rounded-xl" />
  ) : (
    <Card className="p-6">
      <div className="space-y-2 h-full flex flex-col">
        <div className="flex items-center justify-between h-16">
          <span className="text-muted-foreground max-w-[75%]">{title}</span>
          <div className="rounded bg-teal-400 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-6xl font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
          {percentage && (
            <span className="text-2xl text-slate-400 font-light mb-1">
              (
              {typeof percentage === "string"
                ? percentage
                : `${(percentage * 100).toFixed(1)}%`}
              )
            </span>
          )}
        </span>
        {description && (
          <span className="pt-4 px-2 text-slate-400">{description}</span>
        )}
      </div>
    </Card>
  );
}
export default InfoCard;
