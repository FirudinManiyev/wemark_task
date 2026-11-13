import type { Metadata } from "next";
import { firsNeue, hoves } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "xSchool | Wemark",
  description: "Explore xSchool by Wemark: practical programs for the next generation of marketing leaders.",
  openGraph: {
    title: "xSchool | Wemark",
    description: "Practical marketing leadership programs by Wemark.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "xSchool | Wemark",
    description: "Practical marketing leadership programs by Wemark.",
  },
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
