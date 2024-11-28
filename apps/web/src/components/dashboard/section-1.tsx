import { Building2, CarFront, LineChart, PercentSquare, Scale } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CardIcons from '../ui/card-icons'

export default function DashboardSection1() {
  return (
    <div className="space-y-6 text-foreground">
      <h2 className="text-2xl font-bold">Visão Geral das Emissões de CO₂</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Emissions Card */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Emissões Totais de CO₂</CardTitle>
            <CardIcons>
              <Scale />
            </CardIcons>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">193.000t</div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                <CarFront size={20} className="text-primary-foreground" />
                <span className="text-sm text-muted-foreground">Transportes: 145.000t</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-primary-foreground" />
                <span className="text-sm text-muted-foreground">Edifícios: 78.000t</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variation Card */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Variação Total (2022 vs. 2023)</CardTitle>
            <CardIcons>
              <LineChart />
            </CardIcons>
          </CardHeader>
          <CardContent>
            <div className="text-sm mb-4 text-muted-foreground">
              Emissões totais aumentaram 3% em relação a 2022
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transporte</span>
                <span className="text-lg font-medium text-destructive-foreground">+3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Edifícios</span>
                <span className="text-lg font-medium text-primary-foreground">-6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Per Building Card */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Métricas por edifício residencial</CardTitle>
            <CardIcons>
              <PercentSquare />
            </CardIcons>

          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-foreground">10.09</div>
                <div className="text-sm text-muted-foreground">tCO₂/edifício</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">5.4</div>
                <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Métricas por edifício não residencial</CardTitle>
            <CardIcons>
              <PercentSquare />
            </CardIcons>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-foreground">10.09</div>
                <div className="text-sm text-muted-foreground">tCO₂/edifício</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">5.4</div>
                <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Residential Area Card */}
        {/* <Card className="border md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Distribuição por Área</CardTitle>
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Residenciais</div>
                <div className="text-2xl font-bold text-primary-foreground">65.7%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 47.4% das emissões</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Não Residenciais</div>
                <div className="text-2xl font-bold text-primary-foreground">34.3%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 52.6% das emissões</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}