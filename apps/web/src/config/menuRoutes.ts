import { Building, Bus, Cloud, Goal, Home, MapIcon } from "lucide-react";

type Route = {
  id: number;
  title: string;
  path: string;
  icon?: React.ComponentType;
  children?: Route[];
};
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
  },
  {
    id: 3,
    title: "Emissão de edifícios",
    path: "/buildings",
    icon: Building,
  },

  {
    id: 4,
    title: "Metas",
    path: "/",
    icon: Goal,
    children: [
      {
        title: "Rastreador de metas",
        path: "/targets",
        id: 5,
        icon: Goal,
      },
      {
        title: "Histórico de simulações",
        path: "/targets/history",
        id: 6,
        icon: Goal,
      },
    ],
  },
];
