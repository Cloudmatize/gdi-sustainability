import { Building, Bus, Cloud, Goal, Home, MapIcon } from "lucide-react";

export const routes = [
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
  },
  {
    id: 3,
    title: "Emissão de edifícios",
    path: "/buildings",
    icon: Building,
  },

  {
    id: 4,
    title: "Rastreador de metas",
    path: "/targets",
    icon: Goal,
  },
];
