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
      <TooltipContent>{children}</TooltipContent>
    </ShadTooltip>
  );
}
