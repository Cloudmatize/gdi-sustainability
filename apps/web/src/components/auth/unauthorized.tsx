import {
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useDictionary } from "@/context/DictionaryContext";
import { XCircle } from "lucide-react";

export default function Unauthorized() {
  const { dict } = useDictionary()
  return (
    <div className="h-[70%] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <XCircle className="w-16 h-16 text-destructive-foreground mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-800">
            {dict.unauthorized.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {dict.unauthorized.description}
          </p>
        </CardContent>
      </div>
    </div>
  );
}
