import { Bus, Car, BikeIcon as Motorcycle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function EmissionsByTransportModeTable() {
  const transportData = [
    {
      mode: "Automóveis",
      icon: Car,
      trips: "1,574,180,068",
      passengersPerTrip: "1.5",
      totalEmissions: "3,027,871",
      emissionsPerPassenger: "1.28",
    },
    {
      mode: "Motocicletas",
      icon: Motorcycle,
      trips: "189,521,914",
      passengersPerTrip: "1",
      totalEmissions: "124,178",
      emissionsPerPassenger: "0.65",
    },
    {
      mode: "Ônibus",
      icon: Bus,
      trips: "71,675,566",
      passengersPerTrip: "40",
      totalEmissions: "558,306",
      emissionsPerPassenger: "0.19",
    },
  ];
  return (
    <Card className="border-teal-400/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Dados por Modo de Transporte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modal</TableHead>
              <TableHead className="text-right">Viagens Totais</TableHead>
              <TableHead className="text-right">Passageiros/Viagem</TableHead>
              <TableHead className="text-right">
                Emissões Totais (ton)
              </TableHead>
              <TableHead className="text-right">
                Emissões/Passageiro (kgCO₂)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transportData.map((item) => (
              <TableRow key={item.mode}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-teal-400" />
                    {item.mode}
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.trips}</TableCell>
                <TableCell className="text-right">
                  {item.passengersPerTrip}
                </TableCell>
                <TableCell className="text-right">
                  {item.totalEmissions}
                </TableCell>
                <TableCell className="text-right">
                  {item.emissionsPerPassenger}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
