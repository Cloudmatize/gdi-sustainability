
'use client'

import React from "react";
import { Car, Plane, Ship, Truck, Train, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import federatedLogout from "@/utils/federated-logout";

export default function TransportsPage() {
  const handleLogout = () => {
    federatedLogout();
  };

  const transportModes = [
    { name: "Road", icon: Car, emissions: 580, percentage: 58 },
    { name: "Air", icon: Plane, emissions: 285, percentage: 28.5 },
    { name: "Sea", icon: Ship, emissions: 90, percentage: 9 },
    { name: "Rail", icon: Train, emissions: 45, percentage: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">
            Transport Emissions Dashboard
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Transport Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              1,000 tons CO2e
            </div>
            <p className="text-sm text-green-600 mt-1">
              Last updated: March 1, 2024
            </p>
            <p className="text-xs text-green-600 mt-1">
              75% of your company's total emissions
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {transportModes.map((mode) => (
            <Card key={mode.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {mode.name} Transport
                </CardTitle>
                <mode.icon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">
                  {mode.emissions} tons CO2e
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {mode.percentage}% of transport emissions
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Transport Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: Truck,
                  description: "Goods delivery to warehouse",
                  emissions: 2.5,
                },
                {
                  icon: Plane,
                  description: "Business trip to conference",
                  emissions: 1.8,
                },
                {
                  icon: Ship,
                  description: "Overseas product shipment",
                  emissions: 15.3,
                },
                {
                  icon: Car,
                  description: "Employee commute (average)",
                  emissions: 0.8,
                },
                {
                  icon: Train,
                  description: "Inter-city product transport",
                  emissions: 1.2,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <activity.icon className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <p className="text-xs text-green-600">
                      {activity.emissions} tons CO2e
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
