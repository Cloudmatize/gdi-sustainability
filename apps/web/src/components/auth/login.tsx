"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { signIn } from "next-auth/react";
import { Spinner } from "../spinner";

export default function Login() {
  const handleLogin = () => {
    signIn("keycloak", { redirect: true });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#065f46] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/login-background.jpg?height=1080&width=1920')] bg-cover bg-center opacity-20 animate-[wiggle_40s_infinite]" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-primary p-3">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-primary-foreground">
              Bem vindo ao <br /> GDI Sustentabilidade
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitorando e avaliando métricas de sustentabilidade para um
              município melhor
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-primary-foreground hover:bg-primary text-white hover:text-primary-foreground"
              onClick={handleLogin}
            >
              {status === "loading" ? <Spinner /> : "Entrar"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
