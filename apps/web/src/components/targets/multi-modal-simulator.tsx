'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, ArrowRight } from 'lucide-react'

interface TransferConfig {
  id: string
  fromMode: string
  toMode: string
  percentage: number
}

interface TransportMode {
  id: string
  name: string
  icon: JSX.Element
  baseTrips: number
  tripPercentage: number
  passengersPerTrip: number
  totalEmissions: number
  emissionsPerPassenger: number
}

export default function MultiModalSimulator({ formattedData }: { formattedData: TransportMode[] }) {
  const [enabled, setEnabled] = useState(false)
  const [transfers, setTransfers] = useState<TransferConfig[]>([
    { id: '1', fromMode: 'car', toMode: 'rail', percentage: 28 }
  ])

  const addTransfer = () => {
    const newId = (transfers.length + 1).toString()
    setTransfers([...transfers, { id: newId, fromMode: 'car', toMode: 'rail', percentage: 0 }])
  }

  const removeTransfer = (id: string) => {
    setTransfers(transfers.filter(t => t.id !== id))
  }

  const updateTransfer = (id: string, field: keyof TransferConfig, value: string | number) => {
    setTransfers(transfers.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ))
  }

  const calculateImpact = () => {
    const newData = [...formattedData]
    
    transfers.forEach(transfer => {
      const fromMode = newData.find(m => m.id === transfer.fromMode)
      const toMode = newData.find(m => m.id === transfer.toMode)
      
      if (fromMode && toMode) {
        const tripsToTransfer = fromMode.baseTrips * (transfer.percentage / 100)
        const emissionsReduction = (tripsToTransfer / fromMode.baseTrips) * fromMode.totalEmissions
        const emissionsIncrease = (tripsToTransfer / toMode.baseTrips) * toMode.totalEmissions

        fromMode.totalEmissions -= emissionsReduction
        toMode.totalEmissions += emissionsIncrease
        fromMode.baseTrips -= tripsToTransfer
        toMode.baseTrips += tripsToTransfer
      }
    })

    return newData
  }

  const impactData = enabled ? calculateImpact() : formattedData
  const totalEmissionsOriginal = formattedData.reduce((sum, mode) => sum + mode.totalEmissions, 0)
  const totalEmissionsNew = impactData.reduce((sum, mode) => sum + mode.totalEmissions, 0)
  const reductionPercentage = ((totalEmissionsOriginal - totalEmissionsNew) / totalEmissionsOriginal) * 100

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Simulador de Substituição de Modal
          </CardTitle>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {transfers.map((transfer) => (
            <div key={transfer.id} className="grid grid-cols-[1fr,1fr,2fr,auto] gap-4 items-center">
              <Select value={transfer.fromMode} onValueChange={(value) => updateTransfer(transfer.id, 'fromMode', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formattedData.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={transfer.toMode} onValueChange={(value) => updateTransfer(transfer.id, 'toMode', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formattedData.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <Slider
                  value={[transfer.percentage]}
                  onValueChange={(value) => updateTransfer(transfer.id, 'percentage', value[0])}
                  max={100}
                  step={1}
                />
                <div className="text-sm text-muted-foreground">
                  {transfer.percentage}% das viagens
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTransfer(transfer.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addTransfer}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar transferência
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Resultados Comparativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modal</TableHead>
                <TableHead className="text-right">Viagens Originais</TableHead>
                <TableHead className="text-right">Viagens Após Transferência</TableHead>
                <TableHead className="text-right">Emissões Originais</TableHead>
                <TableHead className="text-right">Emissões Após Transferência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedData.map((mode) => {
                const newMode = impactData.find(m => m.id === mode.id)
                return (
                  <TableRow key={mode.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{mode.baseTrips.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{newMode?.baseTrips.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{mode.totalEmissions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{newMode?.totalEmissions.toLocaleString()}</TableCell>
                  </TableRow>
                )
              })}
              <TableRow className="font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {formattedData.reduce((sum, mode) => sum + mode.baseTrips, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {impactData.reduce((sum, mode) => sum + mode.baseTrips, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {totalEmissionsOriginal.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-green-600">
                  {totalEmissionsNew.toLocaleString()}
                  <span className="text-sm ml-2">
                    ({reductionPercentage > 0 ? '-' : '+'}{Math.abs(reductionPercentage).toFixed(2)}%)
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}