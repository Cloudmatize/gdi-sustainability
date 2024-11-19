import { Building, Bus, Cloud, Goal, Home, MapIcon } from "lucide-react";


export const routes = [
    {
        id: 1,
        title: "Visão Geral",
        path: "#",
        icon: Home,
      },
      {
        id: 2,
        title: "Uso e Cobertura do solo",
        path: "/cobertura",
        icon: MapIcon,
      },
      {
        id: 7,
        title: "Apenas Teste",
        path: "/",
        icon: Cloud,
        children: [
            {
                id: 8,
                parent: 7,
                title: "Emissão de Transporte",
                path: "#",
                icon: Bus,
              },
              {
                id: 9,
                parent: 7,
                title: "Emissão de Edifícios",
                path: "#",
                icon: Building,
              },
        ]
    },
      {
        id: 3,
        title: "Rastreador de Metas",
        path: "#",
        icon: Goal,
      },
    {
        id: 4,
        title: "Emissões de CO2",
        path: "/",
        icon: Cloud,
        children: [
            {
                id: 5,
                parent: 4,
                title: "Emissão de Transporte",
                path: "#",
                icon: Bus,
              },
              {
                id: 6,
                parent: 4,
                title: "Emissão de Edifícios",
                path: "#",
                icon: Building,
              },
        ]
    }
  ]
  