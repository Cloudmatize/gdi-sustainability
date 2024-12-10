import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

interface Props {
  data: {
    sector: string;
    percentageChange: number;
  };
  title: string;
  icon?: JSX.Element;
  isIncrease: boolean;
  dict: DictionaryContextType['dict']
}
export default function TransportSectorAnalysisCard({
  data,
  title,
  icon,
  isIncrease,
  dict
}: Props) {
  return (
    <Card className="border w-full">
      <CardHeader className="flex ">
        <CardTitle className="text-sm md:text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            {data?.sector}
          </span>
          <div className="text-end">
            {title}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col lg:flex-col gap-8 items-end w-96">
        <div className="flex items-end justify-between w-full h-full gap-2">
          <div className="space-y-1 w-full h-full gap-4">
            <span className="text-xs md:text-sm text-muted-foreground">
              {isIncrease
                ? dict.dashboard.secondSection.cards.TransportSectorAnalysisHighestIncrease.isIncrease
                : dict.dashboard.secondSection.cards.TransportSectorAnalysisHighestReduction.isIncrease}
            </span>
            <div className="flex items-center flex-row gap-2 w-full">
              {isIncrease ? (
                <MdTrendingUp className="text-destructive-foreground fill-destructive-foreground text-xl" />
              ) : (
                <MdTrendingDown className="text-primary-foreground fill-primary-foreground text-xl" />
              )}
              <div
                className={`${isIncrease
                  ? "text-destructive-foreground"
                  : "text-primary-foreground"
                  } text-2xl font-bold`}
              >
                {data?.percentageChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
