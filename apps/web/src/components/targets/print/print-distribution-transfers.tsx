"use client";

import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/context/DictionaryContext";
import { ArrowRight, Bike, Bus, Car, Train } from "lucide-react";

const icons = {
  AUTOMOBILE: Car,
  MOTORCYCLE: Bike,
  BUS: Bus,
  RAIL: Train,
};

const labels = {
  AUTOMOBILE: "Automóvel",
  MOTORCYCLE: "Motocicleta",
  BUS: "Ônibus",
  RAIL: "Trem",
};

interface Transfer {
  fromMode: keyof typeof icons;
  distributions: {
    toMode: keyof typeof icons;
    percentage: number;
  }[];
}

interface DistributionsModeProps {
  transfers: Transfer[];
}

export default function DistributionsMode({
  transfers,
}: DistributionsModeProps) {
  const { dict } = useDictionary()
  return (
    <div className="space-y-2 text-xs px-0 pb-4">
      {transfers?.map((transfer, index) => {
        const Icon = icons[transfer.fromMode];
        return (
          <div key={index} className="flex items-center gap-1 flex-wrap">
            <Badge className="flex items-center gap-1 bg-slate-600 text-white">
              <Icon className="h-3 w-3" />
              <span className="text-xs">{dict?.mappedTravelMode[transfer.fromMode]}</span>
            </Badge>
            {transfer.distributions.map((dist, dIndex) => {
              const ToIcon = icons[dist.toMode];
              return (
                <div key={dIndex} className="flex items-center">
                  <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                  <Badge className="flex items-center gap-1 bg-white text-slate-700 border">
                    <ToIcon className="h-3 w-3" />
                    <span>{dict?.mappedTravelMode[dist.toMode]}</span>
                    <span className="font-medium ml-1">{dist.percentage}%</span>
                  </Badge>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
