import { maskName } from "@cloudmatize/ts-utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to the Masked Name App!</h1>
      <p className="text-lg">Masked Name: {maskName("John Rock Lee")}</p>
    </main>
  );
}
