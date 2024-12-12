'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, FileDown, History, Search } from 'lucide-react'

const reports = [
  { id: 1, title: "Relatório de Emissões - Janeiro 2024", date: "15/01/2024, 10:30" },
  { id: 2, title: "Simulação de Redução CO2", date: "14/01/2024, 15:45" },
  { id: 3, title: "Análise de Transportes 2023", date: "13/01/2024, 09:15" }
]

export default function ReportHistory() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
          <History className="h-6 w-6 text-slate-700" />
          Histórico de relatórios
        </h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-700" />
          <Input
            placeholder="Buscar relatório..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 border-slate-700 focus:ring-slate-700"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-700">
            <TableHead className="text-slate-700">Título</TableHead>
            <TableHead className="text-slate-700">Data</TableHead>
            <TableHead className="text-right text-slate-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id} className="border-b border-gray-100">
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-700 hover:text-slate-800 hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-700 hover:text-slate-800 hover:bg-slate-100"
                  >
                    <FileDown className="h-4 w-4" />
                    <span className="sr-only">Export CSV</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}