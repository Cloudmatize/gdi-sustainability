import { Building2, CarFront, LineChart, PercentSquare, Scale } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardSection1() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Visão Geral das Emissões de CO₂</h2>
      
      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
        {/* Total Emissions Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Emissões Totais de CO₂</CardTitle>
            <Scale className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-400">193.000t</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <CarFront className="w-4 h-4 text-teal-400/70" />
                <span className="text-sm text-muted-foreground">Transportes: 145.000t</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400/70" />
                <span className="text-sm text-muted-foreground">Edifícios: 78.000t</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variation Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Variação Total (2022 vs. 2023)</CardTitle>
            <LineChart className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-teal-400 mb-4">
              Emissões totais aumentaram 3% em relação a 2022
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transporte</span>
                <span className="text-sm font-medium text-teal-400">+3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Edifícios</span>
                <span className="text-sm font-medium text-teal-400">-6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Per Building Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Métricas por edifício residencial</CardTitle>
            <PercentSquare className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-teal-400">10.09</div>
                <div className="text-sm text-muted-foreground">tCO₂/edifício</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">5.4</div>
                <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Métricas por edifício não residencial</CardTitle>
            <PercentSquare className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-teal-400">10.09</div>
                <div className="text-sm text-muted-foreground">tCO₂/edifício</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">5.4</div>
                <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Residential Area Card */}
        <Card className="border-teal-400/20 md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Distribuição por Área</CardTitle>
            <Building2 className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Residenciais</div>
                <div className="text-2xl font-bold text-teal-400">65.7%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 47.4% das emissões</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Não Residenciais</div>
                <div className="text-2xl font-bold text-teal-400">34.3%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 52.6% das emissões</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}