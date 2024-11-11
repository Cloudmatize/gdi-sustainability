import { getTotalCO2Emission } from "@/services/transports/graphql";
import { useQuery } from "@tanstack/react-query";

export function useTransportsTotalCO2Emission() {
  return useQuery({
    queryKey: ["(transports): total-co2-emission"],
    queryFn: () => getTotalCO2Emission({}),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
