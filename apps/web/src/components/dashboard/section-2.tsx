import { passengersPerTripMapping } from "@/constants/transports";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useDashboardCO2EmissionByModal } from "@/hooks/dashboard";
import {
  useTransportsCO2EmissionByYearAndModal,
  useTransportsCO2EmissionModalAnalysis,
} from "@/hooks/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { calculateEmissionsForSingleMode } from "@/utils/transports/calculate-emission-for-single-mode";
import InfoTooltip from "../ui/info-tooltip";
import { Skeleton } from "../ui/skeleton";
import TransportCo2eComparissonCard, {
  type Co2ComparissonCardProps,
} from "./cards/transport-co2e-comparisson-card";
import TransportEmissionPerPassengerCard, {
  type Co2EmissionPerPassengerComparissonCardProps,
} from "./cards/transport-emission-per-passenger-card";
import TransportSectorAnalysisCard from "./cards/transport-sector-analysis-card";

const firstYear = new Date().getFullYear() - 2;
const secondYear = new Date().getFullYear() - 1;

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
  const year2022 = data.find((item) => item.year === String(firstYear));
  const year2023 = data.find((item) => item.year === String(secondYear));


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
      const value2023 = year2023 ? (year2023[sector] as number) : 0;

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


export default function DashboardSection2({ dict }: DictionaryContextType) {
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

  const {
    data: co2EmissionByYearAndModal,
    isFetching: isLoadingCo2EmissionByYearAndModal,
  } = useTransportsCO2EmissionByYearAndModal({
    filters: {
      date: [2022, 2023],
      mode: ["AUTOMOBILE", "BUS", "MOTORCYCLE"],
    },
  });

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
        ? `${Math.abs(differenceTotalCo2EmissionPercentage).toFixed(2)}% ${differenceTotalCo2EmissionPercentage > 0 ? dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.greater : dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.lower
        }${dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.lastYear}`
        : dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.noDataToCompare;

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

  const co2EmissionsByModalsEmissionsByPassenger: Co2EmissionPerPassengerComparissonCardProps[] =
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
        ? `${Math.abs(differenceEmissionPerPassengerPercentage).toFixed(2)}% ${differenceEmissionPerPassengerPercentage > 0 ? dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.greater : dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.lower
        }${dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.lastYear}`
        : dict.dashboard.secondSection.cards.AverageEmissionsByTransport.TransportCo2eComparissonCard.co2EmissionsByModalsEmissionsByPassenger.description.keepTheSame;

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

  const comparissonSectorData = calculateSectorChanges(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (co2EmissionByYearAndModal?.data as any) || []
  );

  return (
    <div className="space-y-6">
      {/* <div className="text-xl font-bold">
        {dict.dashboard.secondSection.title}{secondYear}
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingModalAnalysis
          ? [1, 2, 3].map((index) => (
            <Skeleton
              key={index}
              className={` w-full h-[200px] rounded-xl${index === [1, 2, 3].length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
            />
          ))
          : modalAnalysis?.modalsData?.map((transport, index) => {
            const formattedModal = {
              ...transport,
              contributionStatusTranslated: dict?.chartTrends[transport.contributionStatus]
            };
            return (
              <Link
                href="/transports"
                key={index}
                className={`  ${modalAnalysis?.modalsData?.length >= 3 &&
                  index === modalAnalysis.modalsData.length - 1
                  ? "lg:col-span-2 xl:col-span-1"
                  : ""
                  }`}
              >
                <ModalAnalysisYearlyCard transport={formattedModal} dict={dict} hover />
              </Link>
            )
          })}
      </div> */}

      <div className="text-xl font-bold">
        {dict.dashboard.secondSection.cards.title}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {isLoadingCo2EmissionByYearAndModal ? (
          <Skeleton className="h-[160px]" />
        ) : (
          <TransportSectorAnalysisCard
            percentageChange={comparissonSectorData?.highestIncrease?.percentageChange}
            sector={dict?.mappedTravelMode[comparissonSectorData?.highestIncrease?.sector]}
            title={dict.dashboard.secondSection.cards.TransportSectorAnalysisHighestIncrease.title}
            icon={getIconByTransportMode({
              mode: comparissonSectorData?.highestIncrease?.sector.toUpperCase(),
            })}
            dict={dict}
            isIncrease
          />
        )}
        {isLoadingCo2EmissionByYearAndModal ? (
          <Skeleton className="h-[160px]" />
        ) : (
          <TransportSectorAnalysisCard
            percentageChange={comparissonSectorData?.highestReduction?.percentageChange}
            sector={dict?.mappedTravelMode[comparissonSectorData?.highestReduction?.sector]}
            title={dict.dashboard.secondSection.cards.TransportSectorAnalysisHighestReduction.title}
            icon={getIconByTransportMode({
              mode: comparissonSectorData?.highestReduction?.sector.toUpperCase(),
            })}
            dict={dict}
            isIncrease={false}
          />
        )}
      </div>

      <div className="text-lg font-medium">
        {dict.dashboard.secondSection.cards.AverageEmissionsByTransport.title}
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
          isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
            <Skeleton
              key={index}
              className={` w-full h-[200px] rounded-xl${index === [1, 2, 3].length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
            />
          ))
          : co2EmissionsByModals?.map((emission, index) => (
            <div
              className={`${co2EmissionsByModals.length >= 3 &&
                index === co2EmissionsByModals.length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
              key={`${emission.mode}-${index}`}
            >
              <TransportCo2eComparissonCard emission={emission} dict={dict} />
            </div>
          ))}
      </div>
      <div className="text-lg font-medium flex items-center gap-1 ">
        {dict.dashboard.secondSection.cards.EmissionsPerPassenger.title}
        <InfoTooltip content={dict.dashboard.secondSection.cards.EmissionsPerPassenger.infoToolTip} />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {isLoadingCo2EmissionByModalFirstYear ||
          isLoadingCo2EmissionByModalSecondYear
          ? [1, 2, 3].map((index) => (
            <Skeleton
              className={`w-full h-[200px] rounded-xl ${index === [1, 2, 3].length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
              key={index}
            />
          ))
          : co2EmissionsByModalsEmissionsByPassenger?.map((emission, index) => (
            <div
              className={`${co2EmissionsByModalsEmissionsByPassenger.length >= 3 && index === co2EmissionsByModalsEmissionsByPassenger.length - 1
                ? "lg:col-span-2 xl:col-span-1"
                : ""
                }`}
              key={`${emission.mode}-${index}`}
            >
              <TransportEmissionPerPassengerCard emission={emission} dict={dict} />
            </div>
          ))}
      </div>
    </div>
  );
}
