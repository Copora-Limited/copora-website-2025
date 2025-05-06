import type React from "react";
import type { Metadata } from "next";
import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: "Copora - Talent Solutions",
  description:
    "Empowering businesses with flexible, cost-effective, and scalable contingent staffing solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#0AB5B5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Copora" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        {/* <link rel="apple-touch-icon" sizes="192x192" href="/192x192.png" /> */}
        {/* <link rel="apple-touch-icon" sizes="512x512" href="/512x512.png" /> */}
        {/* Add system font fallbacks */}
        <style>{`
          body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          }
        `}</style>
      </head>
      <body>
        <>
          {children}
          <Toaster />
          <CookieConsent />
        </>
      </body>
    </html>
  );
}
