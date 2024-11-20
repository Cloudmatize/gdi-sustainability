import {
  getBuildingsCO2EmissionsBySector,
  getBuildingsEnergyFractionsBySector,
  getBuildingsEnergyIntensitiesBySector,
  getBuildingsFloorAreasBySector,
} from "@/services/buildings/graphql";

import { useQuery } from "@tanstack/react-query";

export function useBuildingsFloorAreasBySector({}) {
  return useQuery({
    queryKey: [`(buildings): floor-areas-by-sector`],
    queryFn: () => getBuildingsFloorAreasBySector({}),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useBuildingsCO2EmissionsBySector({}) {
  return useQuery({
    queryKey: [`(buildings): co2-emissions-by-sector`],
    queryFn: () => getBuildingsCO2EmissionsBySector({}),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useBuildingsEnergyFractionsBySector({}) {
  return useQuery({
    queryKey: [`(buildings): energy-fractions-by-sector`],
    queryFn: () => getBuildingsEnergyFractionsBySector({}),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useBuildingsEnergyIntensitiesBySector({}) {
  return useQuery({
    queryKey: [`(buildings): energy-intensities-by-sector`],
    queryFn: () => getBuildingsEnergyIntensitiesBySector({}),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
