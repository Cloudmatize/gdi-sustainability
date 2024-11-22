import { Bus, Car, BikeIcon as Motorcycle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardSection3() {
  const transportData = [
    {
      mode: "Automóveis",
      icon: Car,
      trips: "1,574,180,068",
      passengersPerTrip: "1.5",
      totalEmissions: "3,027,871",
      emissionsPerPassenger: "1.28"
    },
    {
      mode: "Motocicletas",
      icon: Motorcycle,
      trips: "189,521,914",
      passengersPerTrip: "1",
      totalEmissions: "124,178",
      emissionsPerPassenger: "0.65"
    },
    {
      mode: "Ônibus",
      icon: Bus,
      trips: "71,675,566",
      passengersPerTrip: "40",
      totalEmissions: "558,306",
      emissionsPerPassenger: "0.19"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Modo de Transporte</h2>
      
      <Card className="border-teal-400/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Dados por Modo de Transporte</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modal</TableHead>
                <TableHead className="text-right">Viagens Totais</TableHead>
                <TableHead className="text-right">Passageiros/Viagem</TableHead>
                <TableHead className="text-right">Emissões Totais (ton)</TableHead>
                <TableHead className="text-right">Emissões/Passageiro (kgCO₂)</TableHead>
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
                  <TableCell className="text-right">{item.passengersPerTrip}</TableCell>
                  <TableCell className="text-right">{item.totalEmissions}</TableCell>
                  <TableCell className="text-right">{item.emissionsPerPassenger}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-teal-400/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Emissões/Passageiro (kgCO₂) - Carro
              </CardTitle>
              <Car className="w-4 h-4 text-teal-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-teal-400">1.22</div>
                  <div className="text-sm text-muted-foreground">2022</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">1.18</div>
                  <div className="text-sm text-muted-foreground">2023</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                3% menor que o ano anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}