import { Role } from "@/domain/interfaces";

type Route = {
  path: string;
  name: string;
  roles: Role[];
  redirect?: string;
};

export const AppRoutes: { [key: string]: Route } = {
  landingPage: {
    path: "/",
    name: "Home Page",
    roles: [],
    redirect: "/auth",
  },
  auth: {
    path: "/auth",
    name: "Auth",
    roles: [],
  },
  authLogin: {
    path: "/auth/login",
    name: "Login",
    roles: [],
    redirect: "/app/classrooms",
  },

  app: {
    path: "/app",
    name: "App",
    roles: [],
    redirect: "/auth",
  },
} as const;
