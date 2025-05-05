import type React from "react";
export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata = {
  title: "Blog Detail | Copora",
  description:
    "Read our latest articles and insights on recruitment, staffing, and career development.",
};
