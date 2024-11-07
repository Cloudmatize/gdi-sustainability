"use client";
import federatedLogout from "@/utils/federated-logout";

export default function Logout() {
  return <button onClick={() => federatedLogout()}>Signout of keycloak</button>;
}
