import type React from "react";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Copora - Talent Solutions",
  description:
    "Empowering businesses with flexible, cost-effective, and scalable contingent staffing solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Add system font fallbacks */}
        <style>{`
          body {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
