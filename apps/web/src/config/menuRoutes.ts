import {
  FLIPT_BUILDINGS_FLAG,
  FLIPT_TARGETS_FLAG,
  FLIPT_TRANSPORTS_FLAG,
  IS_FLIPT_ACTIVE,
} from "@/constants/flipt";
import { Building, Bus, Goal, Home } from "lucide-react";
interface Route {
  id: number;
  title: string;
  path: string;
  icon: any;
  fliptFlag?: string;
  children?: Route[];
}

export const routes: Route[] = [
  {
    id: 1,
    title: "Visão geral",
    path: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Emissão de transportes",
    path: "/transports",
    icon: Bus,
    fliptFlag: IS_FLIPT_ACTIVE ? FLIPT_TRANSPORTS_FLAG : undefined,
  },
  {
    id: 3,
    title: "Emissão de edifícios",
    path: "/buildings",
    icon: Building,
    fliptFlag: IS_FLIPT_ACTIVE ? FLIPT_BUILDINGS_FLAG : undefined,
  },

  {
    id: 4,
    title: "Rastreador de metas",
    path: "/targets",
    icon: Goal,
    fliptFlag: IS_FLIPT_ACTIVE ? FLIPT_TARGETS_FLAG : undefined,
  },
];
