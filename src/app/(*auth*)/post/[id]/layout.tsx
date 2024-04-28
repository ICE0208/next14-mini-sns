import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Detail",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
