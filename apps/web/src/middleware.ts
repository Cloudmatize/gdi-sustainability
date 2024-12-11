import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define available locales
const locales = ['en', 'pt', 'es'];

// Default locale (you can adjust based on your logic)
const defaultLocale = 'pt';

// Function to build the redirect URL
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
    // biome-ignore lint/complexity/noForEach: <explanation>
    params.forEach((param) => {
      const [key, value] = param.split("=");
      urlParams.append(key, value);
    });
  }

  return new URL(`${path}${params ? `?${urlParams}` : ""}`, req.url);
}

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname === '/') {
      return NextResponse.next()
    }

    // Try to get cookie preference
    let preferredLocale = req.cookies.get('preferredLocale')?.value || defaultLocale;

    // Try to get browser language
    if (!req.cookies.get('preferredLocale')?.value) {
      const acceptLanguage = req.headers.get('accept-language');
      const browserLanguage = acceptLanguage ? acceptLanguage.split(',')[0] : 'en';
      const result = locales.find(locale => browserLanguage.startsWith(locale));
      if (result) {
        preferredLocale = result
      }
    }

    // Ignore static files 
    const staticFileExtensions = /\.(jpg|jpeg|png|svg|gif|ico|webp|woff|woff2|ttf|eot|otf|css|js|map|json)$/i;
    if (staticFileExtensions.test(pathname)) {
      return NextResponse.next();
    }

    // Check if the pathname already contains a valid locale
    const localeMatch = pathname.match(new RegExp(`^/(${locales.join('|')})(/|$)`)); // Match valid locales only
    const pathnameHasLocale = !!localeMatch;
    // const currentLocale = localeMatch?.[1] || defaultLocale;
    const currentLocale = pathnameHasLocale ? localeMatch[1] : preferredLocale;

    const token = req.nextauth.token;
    const autoSignIn = req.nextUrl.search.includes("autoSignIn=true");

    // Redirect unauthenticated users without locale
    if (!token && !pathname.includes('/auth/login')) {
      const redirectParams = autoSignIn ? ["autoSignIn=true"] : [];
      const redirectUrl = buildRedirectUrl({
        req,
        path: `/${currentLocale}/auth/login`,
        params: redirectParams,
      });
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users with token trying to access auth/login
    if (token && pathname.includes('/auth/login')) {
      const redirectUrl = new URL(`/${currentLocale}/dashboard`, req.url);
      console.log(`Redirecting authenticated user to ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect to default locale if no locale is present
    if (!pathnameHasLocale) {
      const redirectUrl = new URL(`/${defaultLocale}${pathname}`, req.url);
      console.log(`Redirecting to ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    }

    if (pathnameHasLocale) {
      // Verifica se o idioma na URL já é o preferido
      const currentLocale = pathname.split("/")[1]; // Obtém o idioma da URL atual
      if (currentLocale !== preferredLocale) {
        // Substitui o idioma na URL pela preferência do usuário
        const correctedPath = pathname.replace(
          new RegExp(`^/(${locales.join('|')})(/|$)`), // Regex para capturar o idioma atual
          `/${preferredLocale}/` // Substitui pelo idioma preferido
        );
    
        const redirect = new URL(correctedPath, req.url);
        console.log(`Redirecting to a correct URL: ${redirect}`);
        return NextResponse.redirect(redirect);
      }
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
  matcher: [
    "/:path*", // Match all paths, including `/dashboard`, `/buildings`, etc.
    "/buildings/:path*",
    "/transports/:path*",
  ],
};