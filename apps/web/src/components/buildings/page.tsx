"use client";
import React from "react";
import { BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import federatedLogout from "@/utils/federated-logout";
import { useSession } from "next-auth/react";

export default function BuildingsPage() {
  const { data } = useSession();

  const handleLogout = () => {
    federatedLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">
            CO2 Emissions Dashboard
          </h1>
          <h1 className="text-2xl font-bold text-green-800">
            Autenticado ? {data?.user?.name ?? 'nao'}
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-green-700 border-green-300 hover:bg-green-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total CO2 Emissions,
              </CardTitle>
              <BarChart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                1,234 tons
              </div>
              <p className="text-xs text-green-600">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Emission Sources
              </CardTitle>
              <BarChart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-16 text-sm">Energy</div>
                  <div className="flex-1"></div>
                  <div className="w-12 text-right text-sm">40%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 text-sm">Transport</div>
                  <div className="flex-1"></div>
                  <div className="w-12 text-right text-sm">35%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 text-sm">Industry</div>
                  <div className="flex-1"></div>
                  <div className="w-12 text-right text-sm">25%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Recent Emissions Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { date: "2024-03-01", amount: 42 },
                { date: "2024-02-28", amount: 38 },
                { date: "2024-02-27", amount: 45 },
                { date: "2024-02-26", amount: 39 },
                { date: "2024-02-25", amount: 41 },
              ].map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{entry.date}</span>
                  <span className="font-medium">{entry.amount} tons</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
