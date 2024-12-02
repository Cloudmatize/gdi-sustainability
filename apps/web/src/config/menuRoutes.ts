import { Building, Bus, Cloud, Goal, Home, MapIcon } from "lucide-react";

export const routes = [
  {
    id: "dashboard",
    title: "Visão Geral",
    path: "/dashboard",
    icon: Home,
  },

  {
    id: "emissions",
    title: "Emissões de CO2",
    path: "/",
    icon: Cloud,
    children: [
      {
        id: 5,
        parent: 4,
        title: " Transportes",
        path: "transports",
        icon: Bus,
      },
      {
        id: 6,
        parent: 4,
        title: "Edifícios",
        path: "buildings",
        icon: Building,
      },
    ],
  },
  {
    id: "targets",
    title: "Rastreador de Metas",
    path: "/targets",
    icon: Goal,
  },
];
