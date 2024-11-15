import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  content: string;
  className?: string;
  iconSize?: number;
}

export default function InfoTooltip({
  content,
  className = "",
  iconSize = 16,
}: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} >
        <TooltipTrigger  asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-${iconSize / 4} w-${iconSize / 4} p-0 ${className}`}
          >
            <Info
              className={`h-${iconSize / 4} w-${iconSize / 4} text-slate-400`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-slate-700 p-5 border">
          <p className="max-w-sm text-base"> {content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
