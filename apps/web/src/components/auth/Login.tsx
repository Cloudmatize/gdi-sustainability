"use client";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import federatedLogout from "@/utils/federated-logout";

export default function Login() {
  const { data, status } = useSession();
  const handleLogin = () => {
    signIn("keycloak", { redirect: true });
  };
  const handleLogout = () => {
    federatedLogout();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#065f46]">
      <div className="absolute inset-0 bg-[url('/login-background.jpg?height=1080&width=1920')] bg-cover bg-center opacity-20" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-green-800">
              Bem vindo ao <br /> GDI Sustentabilidade
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitorando e avaliando métricas de sustentabilidade para um
              município melhor
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="w-full border-green-200 text-green-700 hover:bg-green-50"
            >
              Solicitar Acesso
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
