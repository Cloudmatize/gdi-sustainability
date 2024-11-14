import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import federatedLogout from "./utils/auth/federated-logout";

function buildRedirectUrl({
  req,
  path,
  params,
}: {
  req: Request;
  path: string;
  params?: string[];
}) {
  const urlParams = new URLSearchParams();

  if (params) {
    params.forEach((param) => {
      const [key, value] = param.split("=");
      urlParams.append(key, value);
    });
  }
  return new URL(`${path}${params ? `?${urlParams}` : ""}`, req.url);
}

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    // if (token?.error) {
    //   const redirectUrl = buildRedirectUrl({
    //     req,
    //     path: "/auth/signout",
    //   });
    //   return NextResponse.redirect(redirectUrl);
    // }

    const autoSignIn = req.nextUrl.search.includes("autoSignIn=true");

    if (!token) {
      const redirectParams = autoSignIn ? ["autoSignIn=true"] : [];
      const redirectUrl = buildRedirectUrl({
        req,
        path: "/auth/login",
        params: redirectParams,
      });
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/", "/buildings/:path*", "/transports/:path"],
};
