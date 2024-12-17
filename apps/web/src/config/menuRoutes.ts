import {
  FLIPT_BUILDINGS_FLAG,
  FLIPT_TRANSPORTS_FLAG,
  IS_FLIPT_ACTIVE,
} from "@/constants/flipt";
import { Building, Bus, Goal, Home, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Route {
  id: number;
  title: string;
  path: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  disabled?: boolean;
  children?: { title: string; path: string; id: number; router_title: string;  disabled?: boolean; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; }[]
  router_title: string;
  fliptFlag?: string;
}

type RoutesObject = {
  [key: string]: {
    title: string;
    router_title: string;
    children?: {
      [key: string]: {
      title: string;
    }[]
  }[]
  };
};

export const routes: Route[] = [
  {
    id: 1,
    title: "Visão geral",
    path: "/dashboard",
    disabled: false,
    router_title: "dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Emissão de transportes",
    path: "/transports",
    router_title: "transports",
    icon: Bus,
    fliptFlag: IS_FLIPT_ACTIVE ? FLIPT_TRANSPORTS_FLAG : undefined,
  },
  {
    id: 3,
    title: "Emissão de edifícios",
    path: "/buildings",
    router_title: "buildings",
    icon: Building,
    fliptFlag: IS_FLIPT_ACTIVE ? FLIPT_BUILDINGS_FLAG : undefined,
  },
  {
    id: 4,
    title: "Metas",
    router_title: "targets",
    path: "/",
    icon: Goal,
    children: [
      {
        title: "Rastreador de metas",
        path: "/targets",
        id: 5,
        router_title: "targets_tracker",
        icon: Goal,
      },
      {
        title: "Histórico de simulações",
        path: "/targets/history",
        router_title: "targets_history",
        id: 6,
        icon: Goal,
        disabled: true
      },
    ],
  },
];

export const getRoutes = (_routes: RoutesObject): Route[] => {
  if (!_routes || typeof _routes !== "object") {
    console.error("Invalid routes data", _routes);
    return [];
  }

  const actualRoutes: Route[] = []

  routes?.map((route) => {
    const updatedRoute = _routes[route.router_title];
    if (updatedRoute) {
      if (route?.children) {
        const updatedChildrens: Route['children'] = []
        route?.children?.map((children) => {
          updatedChildrens.push({
            ...children, title: _routes[children.router_title]?.title
          })
        })
        console.log(updatedChildrens)
        actualRoutes.push({ ...route, title: updatedRoute.title, children: updatedChildrens })
      } else {
        actualRoutes.push({ ...route, title: updatedRoute.title})
      }
    } else {
      actualRoutes.push(route)
    }
  })

  if (actualRoutes) return actualRoutes
  return routes
};
