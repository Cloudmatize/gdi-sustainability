import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  triggerContent: React.ReactNode | string;
}

export function Tooltip({ children, triggerContent }: Props) {
  return (
    <ShadTooltip>
      <TooltipTrigger>{triggerContent}</TooltipTrigger>
      <TooltipContent  className="bg-white border text-slate-700 text-sm">{children}</TooltipContent>
    </ShadTooltip>
  );
}
