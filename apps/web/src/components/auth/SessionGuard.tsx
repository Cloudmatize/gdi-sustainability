"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const autoSignInParam = searchParams.get("autoSignIn");
  const { data, status } = useSession();
  
  useEffect(() => {
    const path = window.location.pathname;

    if (
      status === "unauthenticated" &&
      autoSignInParam
    ) {
      signIn("keycloak", { redirect: false });
    }

    if (status === "authenticated" && path === "/auth/login") {
      redirect("/buildings");
    }
  }, [data, status, autoSignInParam]);

  return <>{children}</>;
}
