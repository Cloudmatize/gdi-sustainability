import {
  getTransportsCO2Emission,
  getTransportsCO2EmissionByTravelBounds,
  getTransportsCO2EmissionPerKM,
  getTransportsCO2EmissionByYearAndModal,
  getTransportsCO2EmissionByYear,
} from "@/services/transports/graphql";
import { TransportFilters } from "@/store/transports";
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

export function useTransportsCO2EmissionByYearAndModal() {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-year-and-modal"],
    queryFn: () => getTransportsCO2EmissionByYearAndModal(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
export function useTrannsportCO2EmissionByYear() {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-year"],
    queryFn: () => getTransportsCO2EmissionByYear(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
