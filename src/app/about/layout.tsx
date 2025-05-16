// import type React from "react";
// export default function AboutLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>{children}</>;
// }



import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
