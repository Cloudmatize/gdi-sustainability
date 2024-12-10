import { Building, House, LineChart } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import {
  useDashboardBuildingsTotalCO2Emission,
  useDashboardTransportsTotalCO2Emission,
} from "@/hooks/dashboard";
import Link from "next/link";
import { Tooltip } from "../tooltip";
import CardIcons from "../ui/card-icons";
import { Skeleton } from "../ui/skeleton";
import { TotalCO2eCard } from "./cards/total-co2e-card";
import TargetAdherenceSection from "./target-adherence-section";

function generateComparisonMessage(
  value1: number,
  value2: number
): {
  formattedPercentageChange: number;
  trend: string;
} {
  const difference = value2 - value1;
  const percentageChange = ((difference / value1) * 100).toFixed(2);
  const trend = difference > 0 ? "positive" : "negative";

  const formattedPercentageChange = Math.abs(Number(percentageChange));

  return {
    formattedPercentageChange,
    trend,
  };
}
function formatBuildingsFloorAreasBySector(
  data:
    | {
      residential: {
        area: number;
        count: number;
        co2Emission: number;
        percentage: number;
      };
      notResidential: {
        area: number;
        count: number;
        co2Emission: number;
        percentage: number;
      };
      total: {
        area: number;
        count: number;
        co2Emission: number;
      };
    }
    | undefined
) {
  if (!data) return {};
  const residentialMetrics = {
    areaPercentage: Number(
      ((data.residential.area / data.total.area) * 100).toFixed(1)
    ),
    totalCo2EmissionPercentage: Number(
      (data.residential.percentage * 100).toFixed(1)
    ),
    tCO2PerBuilding: (
      data.residential.co2Emission / data.residential.count
    ).toFixed(2),
    kgCO2PerSquareMeter: (
      (data.residential.co2Emission * 1000) /
      data.residential.area
    ).toFixed(2),
  };

  const nonResidentialMetrics = {
    areaPercentage: Number(
      ((data.notResidential.area / data.total.area) * 100).toFixed(1)
    ),
    totalCo2EmissionPercentage: Number(
      (data.notResidential.percentage * 100).toFixed(1)
    ),
    tCO2PerBuilding: (
      data.notResidential.co2Emission / data.notResidential.count
    ).toFixed(2),
    kgCO2PerSquareMeter: (
      (data.notResidential.co2Emission * 1000) /
      data.notResidential.area
    ).toFixed(2),
  };

  return {
    residential: residentialMetrics,
    nonResidential: nonResidentialMetrics,
  };
}

export default function DashboardSection1({ dict }: DictionaryContextType) {
  const {
    data: transportsCo2Emission,
    isFetching: isLoadingTransportsCo2Emission,
  } = useDashboardTransportsTotalCO2Emission({
    filters: {
      date: [2023],
    },
  });
  const {
    data: transportsCo2EmissionPreviusYear,
    isFetching: isLoadingTransportsCo2EmissionPreviousYear,
  } = useDashboardTransportsTotalCO2Emission({
    filters: {
      date: [2022],
    },
  });

  const {
    data: buildingsCo2Emission,
    isFetching: isLoadingBuildingsCo2Emission,
  } = useDashboardBuildingsTotalCO2Emission({});

  const { data: buildingsInfo, isFetching: isLoadingBuildingsInfo } =
    useBuildingsFloorAreasBySector({ extraKey: "dashboard" });

  const transportsComparissonInfo = generateComparisonMessage(
    transportsCo2EmissionPreviusYear?.totalCO2Emission || 0,
    transportsCo2Emission?.totalCO2Emission || 0
  );

  const formattedBuildingsInfo =
    formatBuildingsFloorAreasBySector(buildingsInfo);

  const cards = [
    {
      title: dict?.dashboard?.firstSection.cards.totalCO2Emission.title,
      icon: (
        <CardIcons>
          <LineChart />
        </CardIcons>
      ),
      href: "/transports",
      loading:
        isLoadingTransportsCo2Emission ||
        isLoadingTransportsCo2EmissionPreviousYear,
      content: (
        <div className="flex flex-col w-full">
          <div
            className="flex items-center justify-evenly gap-3 mb-5 text-xl md:text-2xl 2xl:text-3xl 
 "
          >
            <div className="text-center">
              <div className="font-bold text-primary-foreground">
                {Math.trunc(
                  transportsCo2EmissionPreviusYear?.totalCO2Emission || 0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">2022</div>
            </div>
            <div className="text-2xl md:text-xl text-muted-foreground">×</div>
            <div className="text-center">
              <div className="font-bold text-primary-slate">
                {Math.trunc(
                  transportsCo2Emission?.totalCO2Emission || 0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">2023</div>
            </div>
          </div>
          <CardDescription className="mt-2 text-center ">
            {dict?.dashboard?.firstSection.cards.totalCO2Emission.description1}
            {dict?.dashboard?.firstSection.cards.totalCO2Emission.trends[transportsComparissonInfo.trend]}
            {dict?.dashboard?.firstSection.cards.totalCO2Emission.description2}
            {transportsComparissonInfo.formattedPercentageChange}%
          </CardDescription>
        </div>
      ),
    },
    {
      title: dict?.dashboard?.firstSection.cards.tCO2PerBuilding.title,
      icon: (
        <CardIcons>
          <House />
        </CardIcons>
      ),
      href: "/buildings",
      loading: isLoadingBuildingsInfo,
      content: (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-evenly gap-3 mb-5  text-xl md:text-2xl 2xl:text-3xl ">
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.residential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    {dict?.dashboard?.firstSection.cards.tCO2PerBuilding.tooltipContent}
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.residential?.tCO2PerBuilding} ${dict?.dashboard?.firstSection.cards.tCO2PerBuilding.tCO2PerBuilding}`}
            </Tooltip>

            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    kgCO2e/m²
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter} ${formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter}`}
            </Tooltip>
          </div>
          <CardDescription className="mt-2 text-center">
            {`${dict?.dashboard?.firstSection.cards.tCO2PerBuilding.description1}
            ${formattedBuildingsInfo.residential?.areaPercentage}% ${dict?.dashboard?.firstSection.cards.tCO2PerBuilding.description2}
            ${formattedBuildingsInfo.residential?.totalCo2EmissionPercentage}% ${dict?.dashboard?.firstSection.cards.tCO2PerBuilding.description3}`}
          </CardDescription>
        </div>
      ),
    },
    {
      title: dict?.dashboard?.firstSection.cards.nonResidential.title,
      href: "/buildings",
      icon: (
        <CardIcons>
          <Building />
        </CardIcons>
      ),
      loading: isLoadingBuildingsInfo,
      content: (
        <div className="flex flex-col w-full ">
          <div className="flex items-center justify-evenly gap-3 mb-5  text-xl md:text-2xl 2xl:text-3xl ">
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    {dict?.dashboard?.firstSection.cards.nonResidential.tooltipContent}
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding} ${dict?.dashboard?.firstSection.cards.nonResidential.tCO2PerBuilding}`}
            </Tooltip>
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {
                      formattedBuildingsInfo?.nonResidential
                        ?.kgCO2PerSquareMeter
                    }
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    kgCO2e/m²
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.nonResidential?.kgCO2PerSquareMeter} ${dict?.dashboard?.firstSection.cards.nonResidential.kgCO2PerSquareMeter}`}
            </Tooltip>
          </div>
          <CardDescription className="mt-2 text-center">
            {`${dict?.dashboard?.firstSection.cards.nonResidential.description1}
            ${formattedBuildingsInfo.nonResidential?.areaPercentage}% ${dict?.dashboard?.firstSection.cards.nonResidential.description2}
            ${formattedBuildingsInfo.nonResidential?.totalCo2EmissionPercentage}% ${dict?.dashboard?.firstSection.cards.nonResidential.description3}`}
          </CardDescription>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 text-foreground">
      <h2 className="text-2xl font-bold">
        {dict?.dashboard?.firstSection.title} {new Date().getFullYear() - 1}
      </h2>

      <div className="flex gap-6 flex-col lg:flex-row">
        {isLoadingTransportsCo2Emission || isLoadingBuildingsCo2Emission ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <TotalCO2eCard
            buildingsCo2Emission={buildingsCo2Emission?.totalCO2Emission || 0}
            transportsCo2Emission={transportsCo2Emission?.totalCO2Emission || 0}
            dict={dict}
          />
        )}
        <Link
          href={"/targets"}
          className="h-80  md:h-64 xl:h-52 w-full  card-hover"
        >
          <TargetAdherenceSection dict={dict} />
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {cards?.map((card, index) =>
          card?.loading ? (
            <Skeleton key={`${card.title}-${index}`} className="h-[182px]" />
          ) : (
            <Link
              className={`${index === cards.length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
              href={card.href}
              key={`${card.title}-${index}`}
            >
              <Card className="border card-hover h-full ">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle>{card.title}</CardTitle>
                  {card.icon}
                </CardHeader>
                <CardFooter className="mt-5">{card.content}</CardFooter>
              </Card>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
