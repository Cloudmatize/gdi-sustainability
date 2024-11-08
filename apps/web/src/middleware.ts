import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const autoSignIn = req.nextUrl.search.includes("autoSignIn=true");

    if (req.nextUrl.pathname === "/" && !token) {
      const params = new URLSearchParams();

      if (autoSignIn) {
        params.append("autoSignIn", "true");
      }

      return NextResponse.redirect(new URL(`/auth/login?${params}`, req.url));
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: ["/", "/buildings/:path*", "/transports/:path"],
};
