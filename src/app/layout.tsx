import type { Metadata } from "next";
import { firsNeue, hoves } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "xSchool | Wemark",
  description: "Discover xSchool by Wemark, a school for the next generation of marketing leaders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hoves.variable} ${firsNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
