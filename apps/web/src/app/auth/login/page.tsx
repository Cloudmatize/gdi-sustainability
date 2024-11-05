"use client";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="relative min-h-screen w-full bg-[#065f46]">
      {/* Background Image Pattern */}
      <div className="absolute inset-0 bg-[url('/login-background.jpg?height=1080&width=1920')] bg-cover bg-center opacity-20" />

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-green-800">
              Welcome to GDI Sustainability
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitoring and evaluating sustainability metrics for a better
              municipality
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = "/auth/login")}
            >
              Sign In
            </Button>

            <Button
              variant="outline"
              className="w-full border-green-200 text-green-700 hover:bg-green-50"
            >
              Request Access
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
