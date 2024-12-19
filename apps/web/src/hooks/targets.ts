import { getTargetsCO2EmissionByModal } from "@/services/targets/graphql";
import { getTargetReportsHistory } from "@/services/targets/rest";
import { useQuery } from "@tanstack/react-query";

export function useTargetsCO2EmissionByModal() {
  return useQuery({
    queryKey: ["(targets): co2-emission-by-modal"],
    queryFn: () => getTargetsCO2EmissionByModal(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function useTargetsReportsHistory({}: {}) {
  return useQuery({
    queryKey: ["(targets): reports-history"],
    queryFn: () => getTargetReportsHistory({}),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
