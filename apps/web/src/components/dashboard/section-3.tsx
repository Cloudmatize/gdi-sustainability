import { Bus, Car, BikeIcon as Motorcycle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardSection3() {


  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Modo de Transporte</h2>
      
    

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