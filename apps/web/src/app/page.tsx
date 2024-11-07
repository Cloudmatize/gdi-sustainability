import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Logout from "@/components/auth/Logout";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/domain/routes";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/api/auth/signout");
  } else {
    return redirect("/api/auth/signin");
  }
}
