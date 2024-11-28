import {
  getTransportsCO2Emission,
  getTransportsCO2EmissionByTravelBounds,
  getTransportsCO2EmissionPerKM,
  getTransportsCO2EmissionByYearAndModal,
  getTransportsCO2EmissionByYear,
  getTransportsCO2EmissionModalAnalysis,
} from "@/services/transports/graphql";
import { TransportFilters } from "@/store/transports";
import { TravelMode } from "@/types/transports";
import { useQuery } from "@tanstack/react-query";

export function useTransportsCO2Emission({
  filters,
}: {
  filters?: TransportFilters;
}) {
  return useQuery({
    queryKey: [`(transports): co2-emission`, filters],
    queryFn: () =>
      getTransportsCO2Emission({
        filters,
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionByTravelBounds({
  filters,
}: {
  filters?: TransportFilters;
}) {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-travel-bounds", filters],
    queryFn: () =>
      getTransportsCO2EmissionByTravelBounds({
        filters,
      }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionPerKM({
  filters,
}: {
  filters?: TransportFilters;
}) {
  return useQuery({
    queryKey: [`(transports): co2-emission-per-km`, filters],
    queryFn: () =>
      getTransportsCO2EmissionPerKM({
        filters,
      }),
    staleTime: 0,
    refetchInterval: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionByYearAndModal({
  filters,
}: {
  filters?: { date: number[]; mode: TravelMode[] };
}) {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-year-and-modal", filters],
    queryFn: () => getTransportsCO2EmissionByYearAndModal({ filters }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionModalAnalysis() {
  return useQuery({
    queryKey: ["(transports): c02-emission-modal-analysis"],
    queryFn: () => getTransportsCO2EmissionModalAnalysis(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportCO2EmissionByYear({
  filters,
}: {
  filters?: {
    date: number[];
  };
}) {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-year", filters],
    queryFn: () => getTransportsCO2EmissionByYear({ filters }),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
