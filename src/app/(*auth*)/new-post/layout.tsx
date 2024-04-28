import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Post",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
