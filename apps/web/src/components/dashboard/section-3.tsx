import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from 'lucide-react'

export default function DashboardSection3() {


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Modo de Transporte</h2>

      {/* <Card className="border-teal-400/20">
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
      </Card> */}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-teal-400/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Emissões/Passageiro (kgCO₂) - Carro
              </CardTitle>
              <Car size={32} className="text-teal-400" />
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