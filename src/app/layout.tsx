import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cls } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Mini SNS | %s",
    default: "Mini SNS",
  },
  description: "Mini SNS WEBSITE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cls(inter.className, "flex min-h-screen flex-col")}>
        {children}
      </body>
    </html>
  );
}
