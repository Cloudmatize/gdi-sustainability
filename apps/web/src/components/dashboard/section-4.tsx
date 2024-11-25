import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownUp, Droplet, Zap } from 'lucide-react'

export default function DashboardSection4() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Emissões por Fonte de Energia</h2>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Main Contributor Card */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap size={28} className=" text-teal-400" />
              Fonte Principal de Emissões de CO₂
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="text-3xl font-bold text-teal-400">
              Eletricidade
            </div>
            <div className="space-y-2 border-b">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contribuição nas emissões dos edifícios</span>
                <span className="font-medium text-lg text-teal-400">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total de CO₂ emitido</span>
                <span className="font-medium text-lg text-teal-400">68.692t</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Comparison Card */}
        <Card className="border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center  gap-2">
              <ArrowDownUp size={32} className=" text-teal-400" />
              Comparativo de Eficiência
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 gap-2 flex flex-col">
            <div className="text-sm text-muted-foreground">
              Óleo diesel tem o menor impacto por kWh (0.0001 kgCO₂/kWh), sendo 3 vezes mais eficiente que eletricidade.
            </div>
            <div className="my-2 gap-1 flex flex-col">
              <div className="flex items-center">
                <p className="text-2xl font-bold text-slate-800 min-w-36">Óleo Diesel</p>
                <div className="flex items-center gap-1 text-teal-400">
                  <Droplet size={16} className="" />
                  <span className="font-medium">Fonte mais eficiente</span>
                </div>
              </div>
              <div className="flex items-center ">
                <div className="text-2xl font-bold text-slate-800 min-w-36">Eletricidade</div>
                <div className="flex items-center gap-2 text-rose-400">
                  <Zap size={16} className="" />
                  <span className="font-medium">Fonte menos eficiente</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}