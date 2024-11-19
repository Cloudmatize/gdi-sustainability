import { Bus, Car, BikeIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardSection2() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Comparativo de Emissões por Transporte</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Transport Mode Cards */}
        <Card className="border-teal-400/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-teal-400" />
                  <span className="text-lg font-medium">Carro</span>
                </div>
                <p className="text-sm text-muted-foreground">Aumento anual médio nas emissões</p>
              </div>
              <div className="text-rose-500 text-sm font-medium">+32.1%</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-teal-400">82.51%</div>
              <p className="text-sm text-muted-foreground">do total de transportes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-400/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-teal-400" />
                  <span className="text-lg font-medium">Ônibus</span>
                </div>
                <p className="text-sm text-muted-foreground">Redução anual médio nas emissões</p>
              </div>
              <div className="text-emerald-500 text-sm font-medium">-43.71%</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-teal-400">13.97%</div>
              <p className="text-sm text-muted-foreground">do total de transportes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-400/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BikeIcon className="w-5 h-5 text-teal-400" />
                  <span className="text-lg font-medium">Motocicleta</span>
                </div>
                <p className="text-sm text-muted-foreground">Redução anual médio nas emissões</p>
              </div>
              <div className="text-emerald-500 text-sm font-medium">-8.78%</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-teal-400">3.52%</div>
              <p className="text-sm text-muted-foreground">do total de transportes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-teal-400/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Modal com maior aumento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-teal-400" />
                <span className="font-medium">Carros</span>
              </div>
              <div className="text-rose-500 font-medium">+5% em relação ao ano anterior</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              em relação aos anos anteriores (2018-2023)
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-400/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Setor com maior redução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-teal-400" />
                <span className="font-medium">Ônibus</span>
              </div>
              <div className="text-emerald-500 font-medium">-15% em relação ao ano anterior</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              em relação aos anos anteriores (2018-2023)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emission Comparison Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-teal-400/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Emissão Média de CO2 por Ano - Ônibus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">80t</div>
                  <div className="text-sm text-muted-foreground">2023</div>
                </div>
                <div className="text-2xl text-muted-foreground">×</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">23t</div>
                  <div className="text-sm text-muted-foreground">2024</div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                45% menor que o ano anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}