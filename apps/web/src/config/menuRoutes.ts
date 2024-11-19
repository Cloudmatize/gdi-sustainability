import { Building, Bus, Cloud, Goal, Home, MapIcon } from "lucide-react";


export const routes = [
    {
        id: 1,
        title: "Visão Geral",
        path: "/transports",
        icon: Home,
      },
      {
        id: 2,
        title: "Uso e Cobertura do solo",
        path: "#cobertura",
        icon: MapIcon,
      },
      {
        id: 3,
        title: "Rastreador de Metas",
        path: "#metas",
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
                path: "transports",
                icon: Bus,
              },
              {
                id: 6,
                parent: 4,
                title: "Emissão de Edifícios",
                path: "buildings",
                icon: Building,
              },
        ]
    }
  ]
  