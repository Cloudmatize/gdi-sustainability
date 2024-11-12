import TransportsPage from "@/components/transports/page";
import { redirect } from "next/navigation";

// const HomePage = () => <TransportsPage />;

export default async function Home() {
  redirect("/buildings");
}
