"use client";

import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  startYear?: number;
  endYear?: number;
}

export default function YearSelect({
  value = "2023",
  onValueChange = () => {},
  startYear = 2020,
  endYear = 2030,
}: YearSelectProps) {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  ).sort((a, b) => b - a);  

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[120px] bg-white">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-600" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem className="cursor-pointer" key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
