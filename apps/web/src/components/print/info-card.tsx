import { Card } from "@/components/ui/card";
import CardIcons from "@/components/ui/card-icons";
import InfoTooltip from "@/components/ui/info-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

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
  return loading ? (
    <Skeleton className="h-60 w-full  rounded-xl text-xs" />
  ) : (
    <Card className="p-4 h-32 w-full ">
      <div className="gap-1 h-full flex flex-col">
        <div className="flex items-center justify-between h-6">
          <div className="flex items-center max-w-[75%] gap-2 text-xs ">
            <span className="text-muted-foreground text-xs">{title}</span>
            {infoTooltip && <InfoTooltip content={infoTooltip} />}
          </div>
          <CardIcons className="h-4 w-4">
            <Icon />
          </CardIcons>
        </div>
        <span className="  text-base font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
          {percentage && (
            <span className="text-xs text-slate-400 font-light mb-1">
              (
              {typeof percentage === "string"
                ? percentage
                : `${(percentage * 100).toFixed(1)}%`}
              )
            </span>
          )}
        </span>
        {description && (
          <span className="pt-2 text-xs text-slate-400">{description}</span>
        )}
      </div>
    </Card>
  );
}
export default InfoCard;
