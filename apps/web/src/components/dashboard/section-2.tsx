import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mappedTravelMode } from "@/constants/transports";
import { useDashboardCO2EmissionByModal } from "@/hooks/dashboard";
import { TravelMode } from "@/types/transports";
import { BikeIcon, Bus, Car } from "lucide-react";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { Skeleton } from "../ui/skeleton";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";

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

function Co2EmissionComparissonCard(emission: Co2ComparissonCardProps) {
  return (
    <Card key={emission.mode} className="border-teal-400/20 w-full">
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
    <Card className="border-teal-400/20">
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
    filters: { date: `${firstYear}` },
  });

  const {
    data: co2EmissionByModalSecondYear,
    isFetching: isLoadingCo2EmissionByModalSecondYear,
  } = useDashboardCO2EmissionByModal({
    filters: { date: `${secondYear}` },
  });

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
          ? `${Math.abs(differenceTotalCo2EmissionPercentage).toFixed(2)}% ${
              differenceTotalCo2EmissionPercentage > 0 ? "maior" : "menor"
            } que o ano anterior`
          : "Sem dados para comparação";

      const differencePercentageEmissionPerPassengerDescription =
        differenceEmissionPerPassengerPercentage !== null
          ? `${Math.abs(differenceEmissionPerPassengerPercentage).toFixed(2)}% ${
              differenceEmissionPerPassengerPercentage > 0 ? "maior" : "menor"
            } que o ano anterior`
          : "Sem dados para comparação";

      return {
        mode: firstYearData?.mode,
        firstYear: {
          year: firstYear,
          co2Emissions: Math.trunc(firstYearData.co2Emissions),
          emissionsPerPassenger: parseFloat(
            emissionsPerPassengerFirstYear.toFixed(5)
          ),
        },
        secondYear: {
          year: secondYear,
          co2Emissions: secondYearData
            ? Math.trunc(secondYearData?.co2Emissions)
            : 0,
          emissionsPerPassenger: secondYearData
            ? parseFloat(emissionsPerPassengerSecondYear.toFixed(5))
            : 0,
        },
        differenceTotalCo2EmissionPercentageDescription,
        differencePercentageEmissionPerPassengerDescription,
      };
    }) || [];
    console.log("co2EmissionsByModals", co2EmissionsByModals);
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
        {transports.map((transport) => (
          <Card className="border-teal-400/20 w-full" key={transport.id}>
            <CardHeader>
              <CardTitle className="gap-2 flex">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-row">
                    <transport.icon size={32} className="text-teal-400" />
                    <span className="text-lg font-medium">
                      {transport.title}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center md:items-end w-full h-full md:justify-items-end">
                    <p className="text-sm font-normal text-muted-foreground flex flex-row gap-1">
                      <div className="text-sm font-bold text-teal-500">
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
                      <MdTrendingDown className="text-teal-500 fill-teal-400 text-xl" />
                    ) : (
                      <MdTrendingUp className="text-rose-500 fill-rose-500 text-xl" />
                    )}
                    <div
                      className={`${transport.positive ? "text-teal-500" : "text-rose-500"} text-2xl font-medium`}
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

      <h2 className="text-2xl font-bold">Maiores altas e quedas</h2>

      {/* Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {transports
          .filter((transport, index) => index < 2)
          .map((transport) => (
            <Card className="border-teal-400/20 w-full" key={transport.id}>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Setor com{" "}
                  {transport.positive ? "maior aumento" : "maior redução"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <transport.icon size={32} className="text-teal-400" />
                      <span className="font-medium">{transport.title}</span>
                    </div>
                    <div
                      className={`${transport.positive ? "text-teal-500" : "text-rose-500"} text-rose-500 font-medium flex items-center gap-2`}
                    >
                      <MdTrendingUp /> {transport.ajusteAnual}% em relação ao
                      ano anterior ({new Date().getFullYear() - 1})
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Emission Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingCo2EmissionByModalFirstYear ||
        isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
              <Skeleton className="w-full h-[200px] rounded-xl" />
            ))
          : co2EmissionsByModals?.map((emission) => (
              <Co2EmissionComparissonCard {...emission} />
            ))}
      </div>
      {/* Emission Per Passenger Card */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
        isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
              <Skeleton className="w-full h-[200px] rounded-xl" />
            ))
          : co2EmissionsByModals?.map((emission) => (
              <EmissionPerPassengerCard {...emission} />
            ))}
      </div>
    </div>
  );
}
