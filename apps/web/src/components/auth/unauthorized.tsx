import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="h-[70%] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Acesso não autorizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Desculpe, você não tem permissão para acessar esta página. Por
            favor, verifique suas credenciais ou entre em contato com o
            administrador do sistema.
          </p>
        </CardContent>
      </div>
    </div>
  );
}
