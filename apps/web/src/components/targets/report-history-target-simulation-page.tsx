"use client";

import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, History, Search } from "lucide-react";
import { useTargetsReportsHistory } from "@/hooks/targets";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns/format";
import { ReportSimulationHistory } from "@/store/targets";
import { Dialog, DialogContent } from "../ui/dialog";
import { PrintButton } from "../print-button";
import { usePrintStore } from "@/store/print";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";
import PrintTargetsPage from "./print/print-page";

export default function ReportHistory() {
  const { data, isFetching } = useTargetsReportsHistory({});
  const [searchQuery, setSearchQuery] = useState("");

  const contentRef = useRef(null);
  const filteredReports = data?.filter((report) =>
    report.reportName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedReport, setSelectedReport] = useState(
    {} as ReportSimulationHistory
  );

  const { isPrinting } = usePrintStore();

  const [openDialog, setOpenDialog] = useState(false);

  const printContent = {
    ...selectedReport?.data,
  };

  return (
    <>
      {selectedReport?.data && openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent
            aria-describedby={undefined}
            className="h-[90vh] sm:max-w-[900px] lg:max-w-[1200px] overflow-auto"
          >
            <DialogTitle></DialogTitle>
            <PrintTargetsPage
              title={selectedReport?.reportName}
              date={format(selectedReport?.generatedDate, "yyyy/MM/dd HH:mm")}
              isHistoryReport
              data={{ ...selectedReport?.data }}
            />
          </DialogContent>
        </Dialog>
      )}
      {isPrinting && selectedReport && (
        <PrintTargetsPage
          title={selectedReport?.reportName}
          date={format(selectedReport?.generatedDate, "yyyy/MM/dd HH:mm")}
          componentRef={contentRef}
          isHistoryReport
          data={printContent}
        />
      )}
      <div className={cx("space-y-6 p-6", isPrinting ? "hidden" : "")}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <History className="h-6 w-6 text-slate-700" />
            Histórico de relatórios de simulação de metas
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
        {isFetching ? (
          <Skeleton className="h-screen" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-700">
                <TableHead className="text-slate-700">Título</TableHead>
                <TableHead className="text-slate-700">Data</TableHead>
                <TableHead className="text-right text-slate-700">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports?.map((report, index) => (
                <TableRow key={index} className="border-b border-gray-100">
                  <TableCell className="font-medium">
                    {report.reportName}
                  </TableCell>
                  <TableCell>
                    {format(new Date(report.generatedDate), "yyyy/MM/dd HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setOpenDialog(true);
                          setSelectedReport(report);
                        }}
                        size="icon"
                        className="h-8 w-8 text-slate-700 hover:text-slate-800 hover:bg-slate-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <PrintButton
                        disabled={false}
                        contentToPrint={contentRef}
                        title={selectedReport.reportName}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
