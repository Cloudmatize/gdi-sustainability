"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDictionary } from "@/context/DictionaryContext";
import { Printer } from "lucide-react";

export default function PrintLoadingStatePage() {
  const { dict } = useDictionary();
  return (
    <div className="min-h-screen  flex items-center justify-center bg-white p-4 print:hidden">
      <Card className="w-full max-w-lg relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-slate-700">
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
        </CardContent>

        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="text-center">
            <Printer className="h-12 w-12 text-slate-700 mb-4 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              {dict?.loadingTitle}
            </h2>
            <p className="text-slate-600">{dict?.loadingDescription}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
