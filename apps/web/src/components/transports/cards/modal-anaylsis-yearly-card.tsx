import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import type { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { cx } from "class-variance-authority";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

interface Props {
  transport: {
    mode: TravelMode;
    percentageContribution: number;
    contributionStatus: "Redução" | "Elevação";
    avgPercentageYearly: number;
  };
  hover?: boolean;
  dict: DictionaryContextType['dict'];
}

export default function ModalAnalysisYearlyCard({ transport, hover, dict }: Props) {
  return (
    <Card className={cx("border w-full", hover ? "card-hover" : "")}>
      <CardHeader>
        <CardTitle className="gap-2 flex">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-row">
              {getIconByTransportMode({ mode: transport?.mode }) as any}
              <span className="">
                {dict?.mappedTravelMode[transport.mode]}
              </span>
            </div>
            <div className="flex gap-2 items-center md:items-end w-full h-full md:justify-items-end">
              <div className="text-sm font-normal text-muted-foreground flex flex-row gap-1">
                <div className="text-sm font-bold text-primary-slate">
                  {transport.percentageContribution}%
                </div>
                {dict?.transports.sections.Co2EmissionPerTransport.cards.percentageDescription}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-col gap-8 items-end max-w-96">
        <div className="flex items-end justify-between w-full h-full gap-2">
          <div className="space-y-1 w-full h-full gap-4">
            <p className="text-sm text-muted-foreground text-wrap">
              {transport.contributionStatus === "Redução"
                ? "Redução"
                : "Aumento"}{" "}
              anual médio nas emissões
            </p>
            <div className="flex items-center flex-row gap-2 w-full">
              {transport.contributionStatus === "Redução" ? (
                <MdTrendingDown className="text-primary-foreground fill-teal-400 text-xl" />
              ) : (
                <MdTrendingUp className="text-destructive-foreground fill-destructive-foreground text-xl" />
              )}
              <div
                className={`${transport.contributionStatus === "Redução" ? "text-primary-foreground" : "text-destructive-foreground"} text-2xl font-bold`}
              >
                {transport.avgPercentageYearly}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
