import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mappedTravelMode,
  passengersPerTripMapping,
} from "@/constants/transports";
import { useDashboardCO2EmissionByModal } from "@/hooks/dashboard";
import {
  useTransportsCO2EmissionByYearAndModal,
  useTransportsCO2EmissionModalAnalysis,
} from "@/hooks/transports";
import type { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { Fragment } from "react";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { calculateEmissionsForSingleMode } from "@/utils/transports/calculate-emission-for-single-mode";
import { Skeleton } from "../ui/skeleton";
import InfoTooltip from "../ui/info-tooltip";
import Link from "next/link";
import ModalAnalysisYearlyCard from "../transports/cards/modal-anaylsis-yearly-card";

const firstYear = new Date().getFullYear() - 2;
const secondYear = new Date().getFullYear() - 1;

type Co2ComparissonCardProps = {
  mode: string;
  firstYear: {
    year: number;
    co2Emissions: number;
  };
  secondYear: {
    year: number;
    co2Emissions: number;
  };
  description: string;
};

type Co2EmissionPerPassengerComparissonCardProps = {
  mode: string;
  firstYear: {
    year: number;
    emissionsPerPassenger: number;
  };
  secondYear: {
    year: number;
    emissionsPerPassenger: number;
  };
  description: string;
};

type SectorData = {
  year: string;
  [sector: string]: number | string;
};

function calculateSectorChanges(data: SectorData[]): {
  highestIncrease: { sector: string; percentageChange: number };
  highestReduction: { sector: string; percentageChange: number };
} {
  if (!data.length)
    return {
      highestIncrease: {
        sector: "",
        percentageChange: Number.NEGATIVE_INFINITY,
      },
      highestReduction: {
        sector: "",
        percentageChange: Number.POSITIVE_INFINITY,
      },
    };
  const year2022 = data.find((item) => item.year === "2022");
  const year2023 = data.find((item) => item.year === "2023");

  if (!year2022 || !year2023) {
    throw new Error("Data for both years must be provided.");
  }

  let highestIncrease = {
    sector: "",
    percentageChange: Number.NEGATIVE_INFINITY,
  };
  let highestReduction = {
    sector: "",
    percentageChange: Number.POSITIVE_INFINITY,
  };

  for (const sector in year2022) {
    if (sector !== "year") {
      const value2022 = year2022[sector] as number;
      const value2023 = year2023[sector] as number;

      const percentageChange = ((value2023 - value2022) / value2022) * 100;

      if (percentageChange > highestIncrease.percentageChange) {
        highestIncrease = { sector, percentageChange };
      }
      if (percentageChange < highestReduction.percentageChange) {
        highestReduction = { sector, percentageChange };
      }
    }
  }

  return { highestIncrease, highestReduction };
}

function Co2EmissionComparissonCard(emission: Co2ComparissonCardProps) {
  return (
    <Card key={emission.mode} className="border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle> {mappedTravelMode[emission.mode as TravelMode]}</CardTitle>
        {getIconByTransportMode(emission.mode)}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-foreground">
              {emission.firstYear.co2Emissions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.firstYear.year}
            </div>
          </div>
          <div className="text-2xl md:text-xl text-muted-foreground">×</div>
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-slate">
              {emission.secondYear.co2Emissions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.secondYear.year}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {emission.description}
        </div>
      </CardContent>
    </Card>
  );
}
function EmissionPerPassengerCard(
  emission: Co2EmissionPerPassengerComparissonCardProps
) {
  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle> {mappedTravelMode[emission.mode as TravelMode]}</CardTitle>
        {getIconByTransportMode(emission.mode)}
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-foreground">
              {emission.firstYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">{firstYear}</div>
          </div>
          <div className="text-2xl md:text-xl text-muted-foreground">×</div>
          <div className="text-center">
            <div className="text-3xl md:text-xl font-bold text-primary-slate">
              {emission.secondYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">{secondYear}</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {emission.description}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardSection2() {
  const {
    data: co2EmissionByModalFirstYear,
    isFetching: isLoadingCo2EmissionByModalFirstYear,
  } = useDashboardCO2EmissionByModal({
    filters: { date: [firstYear] },
  });

  const {
    data: co2EmissionByModalSecondYear,
    isFetching: isLoadingCo2EmissionByModalSecondYear,
  } = useDashboardCO2EmissionByModal({
    filters: { date: [secondYear] },
  });

  const { data: modalAnalysis, isFetching: isLoadingModalAnalysis } =
    useTransportsCO2EmissionModalAnalysis();
  const co2EmissionsByModals: Co2ComparissonCardProps[] =
    co2EmissionByModalFirstYear?.map((firstYearData) => {
      const secondYearData = co2EmissionByModalSecondYear?.find(
        (item) => item.mode === firstYearData.mode
      );

      const differenceTotalCo2EmissionPercentage = secondYearData
        ? ((secondYearData.co2Emissions - firstYearData.co2Emissions) /
            firstYearData.co2Emissions) *
          100
        : null;

      const description = differenceTotalCo2EmissionPercentage
        ? `${Math.abs(differenceTotalCo2EmissionPercentage).toFixed(2)}% ${
            differenceTotalCo2EmissionPercentage > 0 ? "maior" : "menor"
          } que o ano anterior`
        : "Sem dados para comparação";

      return {
        mode: firstYearData?.mode,
        firstYear: {
          year: firstYear,
          co2Emissions: Math.trunc(firstYearData.co2Emissions),
        },
        secondYear: {
          year: secondYear,
          co2Emissions: secondYearData
            ? Math.trunc(secondYearData?.co2Emissions)
            : 0,
        },
        description,
      };
    }) || [];

  const co2EmissionsByModalsEmissionsByPassenger: {
    mode: string;
    firstYear: {
      year: number;
      emissionsPerPassenger: number;
    };
    secondYear: {
      year: number;
      emissionsPerPassenger: number;
    };

    description: string;
  }[] =
    co2EmissionByModalFirstYear?.map((firstYearData) => {
      const secondYearData = co2EmissionByModalSecondYear?.find(
        (item) => item.mode === firstYearData.mode
      );

      const emissionsPerPassengerFirstYear = Number(
        calculateEmissionsForSingleMode(
          {
            co2Emissions: firstYearData.co2Emissions,
            mode: firstYearData.mode,
            trips: firstYearData.trips,
          },
          passengersPerTripMapping
        ).toFixed(2)
      );
      const emissionsPerPassengerSecondYear = Number(
        calculateEmissionsForSingleMode(
          {
            co2Emissions: secondYearData?.co2Emissions || 0,
            mode: firstYearData.mode,
            trips: secondYearData?.trips || 0,
          },
          passengersPerTripMapping
        ).toFixed(2)
      );

      const differenceEmissionPerPassengerPercentage =
        emissionsPerPassengerSecondYear > 0
          ? ((emissionsPerPassengerSecondYear -
              emissionsPerPassengerFirstYear) /
              emissionsPerPassengerFirstYear) *
            100
          : 0;

      const description = differenceEmissionPerPassengerPercentage
        ? `${Math.abs(differenceEmissionPerPassengerPercentage).toFixed(2)}% ${
            differenceEmissionPerPassengerPercentage > 0 ? "maior" : "menor"
          } que o ano anterior`
        : "Manteve o mesmo valor";

      return {
        mode: firstYearData?.mode,
        firstYear: {
          year: firstYear,
          emissionsPerPassenger: emissionsPerPassengerFirstYear,
        },
        secondYear: {
          year: secondYear,
          emissionsPerPassenger: emissionsPerPassengerSecondYear
            ? Number(emissionsPerPassengerSecondYear.toFixed(2))
            : 0,
        },
        description,
      };
    }) || [];

  const {
    data: co2EmissionByYearAndModal,
    isFetching: isLoadingCo2EmissionByYearAndModal,
  } = useTransportsCO2EmissionByYearAndModal({
    filters: {
      date: [2022, 2023],
      mode: ["AUTOMOBILE", "BUS", "MOTORCYCLE"],
    },
  });

  const comparissonSectorData = calculateSectorChanges(
    (co2EmissionByYearAndModal?.data as any) || []
  );

  return (
    <div className="space-y-6">
      <div className="text-xl font-bold">
        Comparativo de emissões por transporte de 2018 à {secondYear}
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingModalAnalysis
          ? [1, 2, 3].map((index) => (
              <Skeleton key={index} className="w-full h-[200px] rounded-xl" />
            ))
          : modalAnalysis?.modalsData?.map((transport, index) => (
              <Link href="/transports" key={index}>
                <ModalAnalysisYearlyCard transport={transport} />
              </Link>
            ))}
      </div>

      <div className="text-xl font-bold">
        Comparativo de emissões por transporte dos últimos 2 anos
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {isLoadingCo2EmissionByYearAndModal ? (
          <Skeleton className="h-[160px]" />
        ) : (
          <Card className="border w-full">
            <CardHeader className="flex ">
              <CardTitle className=" flex items-center justify-between">
                <span className="flex  items-center gap-2 ">
                  {getIconByTransportMode(
                    comparissonSectorData?.highestIncrease?.sector.toUpperCase()
                  )}
                  {comparissonSectorData?.highestIncrease?.sector}
                </span>
                Setor com maior aumento
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col lg:flex-col gap-8 items-end w-96">
              <div className="flex items-end justify-between w-full h-full gap-2">
                <div className="space-y-1 w-full h-full gap-4">
                  <p className="text-sm text-muted-foreground text-wrap">
                    Aumento dos últimos 2 anos nas emissões
                  </p>
                  <div className="flex items-center flex-row gap-2 w-full">
                    <MdTrendingUp className="text-destructive-foreground fill-destructive-foreground text-xl" />
                    <div
                      className={`text-destructive-foreground text-2xl font-bold`}
                    >
                      {comparissonSectorData?.highestIncrease?.percentageChange.toFixed(
                        2
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {isLoadingCo2EmissionByYearAndModal ? (
          <Skeleton className="h-[160px]" />
        ) : (
          <Card className="border w-full">
            <CardHeader className="flex ">
              <CardTitle className=" flex items-center justify-between">
                <span className="flex  items-center gap-2 ">
                  {getIconByTransportMode(
                    comparissonSectorData?.highestReduction?.sector.toUpperCase()
                  )}
                  {comparissonSectorData?.highestReduction?.sector}
                </span>
                Setor com maior redução
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col lg:flex-col gap-8 items-end w-96">
              <div className="flex items-end justify-between w-full h-full gap-2">
                <div className="space-y-1 w-full h-full gap-4">
                  <p className="text-sm text-muted-foreground text-wrap">
                    Redução dos últimos 2 anos nas emissões
                  </p>
                  <div className="flex items-center flex-row gap-2 w-full">
                    <MdTrendingDown className="text-primary-foreground fill-primary-foreground text-xl" />
                    <div
                      className={`text-primary-foreground text-2xl font-bold`}
                    >
                      {comparissonSectorData?.highestReduction?.percentageChange.toFixed(
                        2
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="text-lg font-medium">
        Emissões médias por transporte (tCO2e)
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
        isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
              <Skeleton key={index} className="w-full h-[200px] rounded-xl" />
            ))
          : co2EmissionsByModals?.map((emission, index) => (
              <Fragment key={`${emission.mode}-${index}`}>
                <Co2EmissionComparissonCard {...emission} />
              </Fragment>
            ))}
      </div>
      <div className="text-lg font-medium flex items-center gap-1 ">
        Emissões por passageiro (kgCO2e)
        <InfoTooltip content="Emissões por passageiro refere-se à quantidade de emissões de CO2 produzidas por passageiro para cada modo de transporte. Esta métrica ajuda a entender o impacto ambiental de transportar um único passageiro usando diferentes modos de transporte." />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
        isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
              <Skeleton key={index} className="w-full h-[200px] rounded-xl" />
            ))
          : co2EmissionsByModalsEmissionsByPassenger?.map((emission, index) => (
              <Fragment key={`${emission.mode}-${index}`}>
                <EmissionPerPassengerCard {...emission} />
              </Fragment>
            ))}
      </div>
    </div>
  );
}
