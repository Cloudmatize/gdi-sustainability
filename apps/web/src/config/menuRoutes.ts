import { Building, Bus, Goal, Home } from "lucide-react";

export let routes = [
  {
    id: 1,
    title: "Visão geral",
    path: "/dashboard",
    router_title: "dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Emissão de transportes",
    path: "/transports",
    router_title: "transports",
    icon: Bus,
  },
  {
    id: 3,
    title: "Emissão de edifícios",
    path: "/buildings",
    router_title: "buildings",
    icon: Building,
  },

  {
    id: 4,
    title: "Rastreador de metas",
    path: "/targets",
    router_title: "targets",
    icon: Goal,
  },
];

type Route = {
  id: number;
  title: string;
  path: string;
  router_title: string;
  icon: React.ComponentType;
};

type RouteUpdate = {
  router_title: string;
  title: string;
};
type RoutesObject = {
  [key: string]: {
    title: string;
    router_title: string;
  };
};

export const getRoutes = (_routes: RoutesObject): Route[] => {
  if (!_routes || typeof _routes !== "object") {
    console.error("Invalid routes data", _routes);
    return [];
  }

  // Extract the values from the object and map them to the `routes` array
  const updatedRoutes = routes.map((route) => {
    const updatedRoute = _routes[route.router_title];
    if (updatedRoute) {
      return { ...route, title: updatedRoute.title };
    }
    return route; // Keep the original route if no update is found
  });

  return updatedRoutes;
};