"use client";
import { signIn, useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loading-page";
import federatedLogout from "@/utils/auth/federated-logout";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const autoSignInParam = searchParams.get("autoSignIn");
  const { data, status } = useSession();
  const [autoSignInLoading, setAutoSignInLoading] = useState(false);

  const isLoading = status === "loading" || autoSignInLoading;

  useEffect(() => {
    const path = window.location.pathname;

    if (path == "/auth/signout") {
      federatedLogout();
    }

    if (status === "unauthenticated" && autoSignInParam) {
      setAutoSignInLoading(true);
      signIn("keycloak", { redirect: false }).finally(() => {
        setAutoSignInLoading(false);
      });
    }

    if (status === "authenticated" && path === "/auth/login") {
      redirect("/dashboard");
    }
  }, [data, status, autoSignInParam]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
