import { signOut } from "next-auth/react";

export default async function federatedLogout() {
  try {
    const response = await fetch("/api/auth/federated-logout");
    if (response.ok) {
      await signOut({ redirect: false });
      window.location.href = "/auth/login";
    }
  } catch (error) {
    await signOut({ redirect: false });
    window.location.href = "/";
  }
}

export async function logout() {
  await federatedLogout();
}
