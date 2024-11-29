import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mappedTravelMode } from "@/constants/transports";
import { useDashboardCO2EmissionByModal } from "@/hooks/dashboard";
import {
  useTransportsCO2EmissionByYearAndModal,
  useTransportsCO2EmissionModalAnalysis,
} from "@/hooks/transports";
import type { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { BikeIcon, Bus, Car } from "lucide-react";
import { Fragment } from "react";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import CardIcons from "../ui/card-icons";
import { Skeleton } from "../ui/skeleton";

const firstYear = new Date().getFullYear() - 1;
const secondYear = new Date().getFullYear() - 2;

type Co2ComparissonCardProps = {
  mode: string;
  firstYear: {
    year: number;
    co2Emissions: number;
    emissionsPerPassenger: number;
  };
  secondYear: {
    year: number;
    co2Emissions: number;
    emissionsPerPassenger: number;
  };
  differenceTotalCo2EmissionPercentageDescription: string;
  differencePercentageEmissionPerPassengerDescription: string;
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
      highestIncrease: { sector: "", percentageChange: Number.NEGATIVE_INFINITY },
      highestReduction: { sector: "", percentageChange: Number.POSITIVE_INFINITY },
    };
  const year2022 = data.find((item) => item.year === "2022");
  const year2023 = data.find((item) => item.year === "2023");

  if (!year2022 || !year2023) {
    throw new Error("Data for both years must be provided.");
  }

  let highestIncrease = { sector: "", percentageChange: Number.NEGATIVE_INFINITY };
  let highestReduction = { sector: "", percentageChange: Number.POSITIVE_INFINITY };

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
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Emissão Média de CO2 por Ano -{" "}
          {mappedTravelMode[emission.mode as TravelMode]} (tCo2)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-400">
              {emission.firstYear.co2Emissions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.firstYear.year}
            </div>
          </div>
          <div className="text-2xl text-muted-foreground">×</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {emission.secondYear.co2Emissions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {emission.secondYear.year}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {emission.differenceTotalCo2EmissionPercentageDescription}
        </div>
      </CardContent>
    </Card>
  );
}
function EmissionPerPassengerCard(emission: Co2ComparissonCardProps) {
  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          Emissões/Passageiro (kgCO₂) - {emission.mode}
        </CardTitle>

        {getIconByTransportMode(emission.mode)}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold text-teal-400">
              {emission.firstYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">{firstYear}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">
              {emission.secondYear.emissionsPerPassenger}
            </div>
            <div className="text-sm text-muted-foreground">{secondYear}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {emission.differencePercentageEmissionPerPassengerDescription}
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

  const co2EmissionsByModals: {
    mode: string;
    firstYear: {
      year: number;
      co2Emissions: number;
      emissionsPerPassenger: number;
    };
    secondYear: {
      year: number;
      co2Emissions: number;
      emissionsPerPassenger: number;
    };
    differenceTotalCo2EmissionPercentageDescription: string;
    differencePercentageEmissionPerPassengerDescription: string;
  }[] =
    co2EmissionByModalFirstYear?.map((firstYearData) => {
      const secondYearData = co2EmissionByModalSecondYear?.find(
        (item) => item.mode === firstYearData.mode
      );

      const emissionsPerPassengerFirstYear = firstYearData.trips
        ? firstYearData.co2Emissions / firstYearData.trips
        : 0;

      const emissionsPerPassengerSecondYear = secondYearData?.trips
        ? secondYearData.co2Emissions / secondYearData.trips
        : 0;

      const differenceTotalCo2EmissionPercentage = secondYearData
        ? ((firstYearData.co2Emissions - secondYearData.co2Emissions) /
          secondYearData.co2Emissions) *
        100
        : null;

      const differenceEmissionPerPassengerPercentage =
        emissionsPerPassengerSecondYear > 0
          ? ((emissionsPerPassengerFirstYear -
            emissionsPerPassengerSecondYear) /
            emissionsPerPassengerSecondYear) *
          100
          : null;

      const differenceTotalCo2EmissionPercentageDescription =
        differenceTotalCo2EmissionPercentage
          ? `${Math.abs(differenceTotalCo2EmissionPercentage).toFixed(2)}% ${differenceTotalCo2EmissionPercentage > 0 ? "maior" : "menor"
          } que o ano anterior`
          : "Sem dados para comparação";

      const differencePercentageEmissionPerPassengerDescription =
        differenceEmissionPerPassengerPercentage !== null
          ? `${Math.abs(differenceEmissionPerPassengerPercentage).toFixed(2)}% ${differenceEmissionPerPassengerPercentage > 0 ? "maior" : "menor"
          } que o ano anterior`
          : "Sem dados para comparação";

      return {
        mode: firstYearData?.mode,
        firstYear: {
          year: firstYear,
          co2Emissions: Math.trunc(firstYearData.co2Emissions),
          emissionsPerPassenger: Number.parseFloat(
            emissionsPerPassengerFirstYear.toFixed(5)
          ),
        },
        secondYear: {
          year: secondYear,
          co2Emissions: secondYearData
            ? Math.trunc(secondYearData?.co2Emissions)
            : 0,
          emissionsPerPassenger: secondYearData
            ? Number.parseFloat(emissionsPerPassengerSecondYear.toFixed(5))
            : 0,
        },
        differenceTotalCo2EmissionPercentageDescription,
        differencePercentageEmissionPerPassengerDescription,
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
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (co2EmissionByYearAndModal?.data as any) || []
  );
  const transports = [
    {
      id: 1,
      title: "Carro",
      ajusteAnual: "+32.1",
      icon: Car,
      positive: false,
      totalDeEmissaoPorTransporte: "82.51",
    },
    {
      id: 2,
      title: "Ônibus",
      icon: Bus,
      ajusteAnual: "-43.71",
      positive: true,
      totalDeEmissaoPorTransporte: "13.97",
    },
    {
      id: 3,
      title: "Motocicleta",
      icon: BikeIcon,
      ajusteAnual: "-8.78",
      positive: true,
      totalDeEmissaoPorTransporte: "3.52",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Comparativo de Emissões por Transporte
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Transport Mode Cards */}

        {/* LEMBRA DE PASSAR OS DADOS DA API PRO FORMATO DESSE transports */}

        {/* {modalAnalysis?.modalsData?.map((modal, index) => {
          const formattedModal = {
            ...modal,
            contributionStatus: modal.contributionStatus as
              | "Redução"
              | "Elevação",
          };
          return (
            <div className="w-full" key={index}>
              <ModalEmissionAnalysisCard
                data={formattedModal}
                loading={isLoadingModalAnalysis}
              />
            </div>
          );
        })} */}

        {/* Adicionar loading aqui também */}
        {transports.map((transport) => (
          <Card className="border w-full" key={transport.id}>
            <CardHeader>
              <CardTitle className="gap-2 flex">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-row">
                    <CardIcons>
                      <transport.icon />
                    </CardIcons>
                    <span className="text-lg font-medium">
                      {transport.title}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center md:items-end w-full h-full md:justify-items-end">
                    <p className="text-sm font-normal text-muted-foreground flex flex-row gap-1">
                      <div className="text-sm font-bold text-primary-foreground">
                        {transport.totalDeEmissaoPorTransporte}%
                      </div>
                      do total de transportes
                    </p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-col gap-8 items-end w-96">
              <div className="flex items-end justify-between w-full h-full gap-2">
                <div className="space-y-1 w-full h-full gap-4">
                  <p className="text-sm text-muted-foreground text-wrap">
                    {transport.positive ? "Redução" : "Aumento"} anual médio nas
                    emissões
                  </p>
                  <div className="flex items-center flex-row gap-2 w-full">
                    {transport.positive ? (
                      <MdTrendingDown className="text-primary-foreground fill-teal-400 text-xl" />
                    ) : (
                      <MdTrendingUp className="text-destructive-foreground fill-destructive-foreground text-xl" />
                    )}
                    <div
                      className={`${transport.positive ? "text-primary-foreground" : "text-destructive-foreground"} text-2xl font-medium`}
                    >
                      {transport.ajusteAnual}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* <h2 className="text-2xl font-bold">Maiores altas e quedas</h2> */}

      {/* Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {isLoadingCo2EmissionByYearAndModal ? (
          <Skeleton className="h-[160px]" />
        ) : (
          <Card className="border w-full">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Setor com maior aumento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    {getIconByTransportMode(
                      comparissonSectorData?.highestIncrease?.sector.toUpperCase()
                    )}
                    <span className="font-medium">
                      {comparissonSectorData?.highestIncrease?.sector}
                    </span>
                  </div>
                  <div
                    className={" text-rose-500 font-medium flex items-center gap-2"}
                  >
                    <MdTrendingUp />{" "}
                    {comparissonSectorData?.highestIncrease?.percentageChange.toFixed(
                      2
                    )}
                    % em relação ao ano anterior ({new Date().getFullYear() - 1}
                    )
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
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Setor com maior redução
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    {getIconByTransportMode(
                      comparissonSectorData?.highestReduction?.sector.toUpperCase()
                    )}
                    <span className="font-medium">
                      {comparissonSectorData?.highestReduction?.sector}
                    </span>
                  </div>
                  <div
                    className={"text-teal-500  font-medium flex items-center gap-2"}
                  >
                    <MdTrendingDown />
                    {comparissonSectorData?.highestReduction?.percentageChange.toFixed(
                      2
                    )}
                    % em relação ao ano anterior ({new Date().getFullYear() - 1}
                    )
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Emission Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      {/* Emission Per Passenger Card */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
          isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
            <Skeleton key={index} className="w-full h-[200px] rounded-xl" />
          ))
          : co2EmissionsByModals?.map((emission, index) => (
            <Fragment key={`${emission.mode}-${index}`}>
              <EmissionPerPassengerCard {...emission} />
            </Fragment>
          ))}
      </div>
    </div>
  );
}
