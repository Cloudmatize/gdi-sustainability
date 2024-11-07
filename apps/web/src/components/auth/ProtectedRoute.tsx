'use client'
import { ReactNode, useEffect } from "react";
import { useKeycloak } from '@react-keycloak/web'

import { useRouter } from "next/navigation";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRoutesProps) {
  const { initialized, keycloak } = useKeycloak();

  const router = useRouter();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      router.push("/auth/login");
    }
  }, [initialized, keycloak.authenticated, router]);
  

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <div>Not authenticated</div>;
  }

  return <>{children}</>;
}
