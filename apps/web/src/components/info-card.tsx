import type React from "react";
import { Card } from "./ui/card";
import InfoTooltip from "./ui/info-tooltip";
import { Skeleton } from "./ui/skeleton";

interface InfoCardProps {
  title: string;
  value?: string | number;
  loading?: boolean;
  percentage?: string | number;
  description?: string;
  icon: React.ElementType;
  infoTooltip?: string;
}

export function InfoCard({
  title,
  value,
  loading,
  percentage,
  icon: Icon,
  description,
  infoTooltip,
}: InfoCardProps) {
  return loading || !value ? (
    <Skeleton className="h-[240px] rounded-xl" />
  ) : (
    <Card className="p-4 h-fit">
      <div className="gap-2 h-full flex flex-col">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center max-w-[75%] gap-2 ">
            <span className="text-muted-foreground">{title}</span>
            {infoTooltip && <InfoTooltip content={infoTooltip} />}
          </div>
          <div className="rounded bg-teal-400 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-4xl md:text-4xl lg:text-5xl font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
          {percentage && (
            <span className="text-xl lg:text-2xl text-slate-400 font-light mb-1">
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
