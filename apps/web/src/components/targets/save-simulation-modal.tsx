"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

interface Props {
  onSave?: (data: { title: string }) => void;
}
export default function SaveSimulationModal({ onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [reportName, setReportName] = useState("");

  const handleSave = () => {
    if (onSave) {
      onSave({ title: reportName });
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="w-full  bg-teal-500 hover:bg-teal-600 text-white"
      >
        <Copy className="mr-2 h-4 w-4" />
        Salvar simulação
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Salvar simulação</DialogTitle>
            <DialogDescription>Dê um nome para a simulação</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do relatório</Label>
              <Input
                id="name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Ex: Simulação de transferência de viagens"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="text-white bg-teal-500">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
