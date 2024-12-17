import SessionGuard from "@/components/auth/session-guard";
import LoadingPage from "@/components/loading-page";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { PublicProviders } from "@/providers/public";
import type { Metadata } from "next";
import { PublicEnvScript } from "next-runtime-env";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go Sustainability",
  description: "Go Sustainability - A platform for sustainable development",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // biome-ignore lint/a11y/useHtmlLang: <explanation>
    <html suppressHydrationWarning>
      <head>
        <PublicEnvScript />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<LoadingPage />}>
            <PublicProviders>
              <SessionGuard>{children}</SessionGuard>
            </PublicProviders>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
