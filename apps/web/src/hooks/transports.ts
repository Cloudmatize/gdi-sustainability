import {
  getTransportsCO2Emission,
  getTransportsCO2EmissionByTravelBounds,
  getTransportsCO2EmissionPerKM,
  getTransportsCO2EmissionByYear,
} from "@/services/transports/graphql";
import { useQuery } from "@tanstack/react-query";

export function useTransportsCO2Emission() {
  return useQuery({
    queryKey: ["(transports): co2-emission"],
    queryFn: () => getTransportsCO2Emission(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionByTravelBounds() {
  return useQuery({
    queryKey: ["(transports): co2-emission-by-travel-bounds"],
    queryFn: () => getTransportsCO2EmissionByTravelBounds(),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useTransportsCO2EmissionPerKM() {
  return useQuery({
    queryKey: ["(transports): co2-emission-per-km"],
    queryFn: () => getTransportsCO2EmissionPerKM(),
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
