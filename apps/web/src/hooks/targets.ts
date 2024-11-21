import { getTargetsCO2EmissionByModal } from "@/services/targets/graphql";
import { useQuery } from "@tanstack/react-query";

export function useTargetsCO2EmissionByModal() {
    return useQuery({
      queryKey: ["(targets): co2-emission-by-modal"],
      queryFn: () => getTargetsCO2EmissionByModal(),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  }
  