import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  targetAdherence: number;
  targetYear: number;
}

export function TargetAdherenceCard({ targetAdherence, targetYear }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aderência à Meta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-2">
          {targetAdherence.toFixed(2)}%
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          da meta de redução de emissões para {targetYear}
        </p>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${Math.min(100, Math.max(0, targetAdherence))}%`,
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
