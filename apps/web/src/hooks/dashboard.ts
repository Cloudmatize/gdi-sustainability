import {
  getDashboardCO2EmissionByModal,
  getDashboardTransportsCo2TotalEmission,
  getDashboardBuildingsCo2TotalEmission,
} from "@/services/dashboard/graphql";
import { TransportFilters } from "@/store/transports";
import { useQuery } from "@tanstack/react-query";

export function useDashboardCO2EmissionByModal({
  filters,
}: {
  filters?: TransportFilters;
}) {
  return useQuery({
    queryKey: ["(dashboard): co2-emission-by-modal", filters],
    queryFn: () => getDashboardCO2EmissionByModal({ filters }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function useDashboardTransportsTotalCO2Emission({
  filters,
}: {
  filters?: TransportFilters;
}) {
  return useQuery({
    queryKey: [`(dashboard): transports-total-co2-emission`, filters],
    queryFn: () => getDashboardTransportsCo2TotalEmission({ filters }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function useDashboardBuildingsTotalCO2Emission({
  filters,
  extraKey,
  enabled = true,
}: {
  filters?: TransportFilters;
  extraKey?: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [`(dashboard): buildings-total-co2-emission`, filters, extraKey],
    queryFn: () => getDashboardBuildingsCo2TotalEmission({ filters }),
    staleTime: Infinity,
    enabled,
    refetchOnWindowFocus: false,
  });
}
