import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TemporaryWorkerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
