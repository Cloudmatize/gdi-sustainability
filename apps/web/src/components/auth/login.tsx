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
        <Card className="w-full max-w-md space-y-12 p-8">
          <div className="text-center">
            <h1 className="text-base my-5 font-semibold text-slate-700">
              Bem vindo ao
              <br />
            </h1>

            <div className="flex justify-center mb-4">
              <img src="/logos/logo-go-sustainability.png" alt="GDI Logo" />
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Transformando dados em ações sustentáveis.
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
