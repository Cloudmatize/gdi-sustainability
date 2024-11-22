import { Zap, Droplet, ArrowDownUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardSection4() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Fonte de Energia</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Contributor Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              Fonte Principal de Emissões de CO₂
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-teal-400">
              Eletricidade
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contribuição nas emissões dos edifícios</span>
                <span className="font-medium text-teal-400">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total de CO₂ emitido</span>
                <span className="font-medium text-teal-400">68.692t</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Comparison Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowDownUp className="w-4 h-4 text-teal-400" />
              Comparativo de Eficiência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-teal-400" />
                  <span className="font-medium">Fonte mais eficiente</span>
                </div>
                <div className="text-2xl font-bold text-teal-400">Óleo Diesel</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="font-medium">Fonte menos eficiente</span>
                </div>
                <div className="text-2xl font-bold text-teal-400">Eletricidade</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Óleo diesel tem o menor impacto por kWh (0.0001 kgCO₂/kWh), sendo 3 vezes mais eficiente que eletricidade.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}