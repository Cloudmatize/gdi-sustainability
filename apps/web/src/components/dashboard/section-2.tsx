import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BikeIcon, Bus, Car } from 'lucide-react'
import { MdTrendingDown, MdTrendingUp } from "react-icons/md"
import CardIcons from "../ui/card-icons"

export default function DashboardSection2() {
  const transports = [
    {
      id: 1,
      title: 'Carro',
      ajusteAnual: '+32.1',
      icon: Car,
      positive: false,
      totalDeEmissaoPorTransporte: '82.51'
    },
    {
      id: 2,
      title: 'Ônibus',
      icon: Bus,
      ajusteAnual: '-43.71',
      positive: true,
      totalDeEmissaoPorTransporte: '13.97'
    },
    {
      id: 3,
      title: 'Motocicleta',
      icon: BikeIcon,
      ajusteAnual: '-8.78',
      positive: true,
      totalDeEmissaoPorTransporte: '3.52'
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comparativo de Emissões por Transporte</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Transport Mode Cards */}
        {transports.map((transport) => (
          <Card className="border w-full" key={transport.id}>
            <CardHeader>
              <CardTitle className="gap-2 flex">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-row">
                    <CardIcons>
                      <transport.icon />
                    </CardIcons>
                    <span className="text-lg font-medium">{transport.title}</span>
                  </div>
                  <div className="flex gap-2 items-center md:items-end w-full h-full md:justify-items-end">
                    <p className="text-sm font-normal text-muted-foreground flex flex-row gap-1">
                      <div className="text-sm font-bold text-primary-foreground">{transport.totalDeEmissaoPorTransporte}%</div>
                      do total de transportes</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-col gap-8 items-end w-96">
              <div className="flex items-end justify-between w-full h-full gap-2">
                <div className="space-y-1 w-full h-full gap-4">
                  <p className="text-sm text-muted-foreground text-wrap">{transport.positive ? 'Redução' : 'Aumento'} anual médio nas emissões</p>
                  <div className="flex items-center flex-row gap-2 w-full">
                    {transport.positive ? <MdTrendingDown className="text-primary-foreground fill-teal-400 text-xl" /> : <MdTrendingUp className="text-destructive-foreground fill-destructive-foreground text-xl" />}
                    <div className={`${transport.positive ? 'text-primary-foreground' : 'text-destructive-foreground'} text-2xl font-medium`}>{transport.ajusteAnual}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold">Maiores altas e quedas</h2>

      {/* Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {transports.filter((transport, index) => index < 2).map((transport) => (
          <Card className="border w-full" key={transport.id}>
            <CardHeader>
              <CardTitle className="text-base font-medium">Setor com {transport.positive ? 'maior aumento' : 'maior redução'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <CardIcons>
                      <transport.icon />
                    </CardIcons>
                    <span className="font-medium">{transport.title}</span>
                  </div>
                  <div className={`${transport.positive ? 'text-primary-foreground' : 'text-destructive-foreground'} text-destructive-foreground font-medium flex items-center gap-2`}>
                    <MdTrendingUp /> {transport.ajusteAnual}% em relação ao ano anterior ({new Date().getFullYear() - 1})</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emission Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border w-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Emissão Média de CO2 por Ano - Ônibus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">80t</div>
                  <div className="text-sm text-muted-foreground">2023</div>
                </div>
                <div className="text-2xl text-muted-foreground">×</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-foreground">23t</div>
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