"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import CardIcons from "../ui/card-icons";
interface GoalCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
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
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2 text-foreground">
            <CardIcons>
              <Icon />
            </CardIcons>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <CardDescription>
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            {subLabel}
          </p>
        </CardDescription>
        <CardDescription>
          <p className="text-xl font-bold text-primary-foreground">
            {subValue}{" "}
            <span className="text-base font-normal text-slate-600">
              {subUnit}
            </span>
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
