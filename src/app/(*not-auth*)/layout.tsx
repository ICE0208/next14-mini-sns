import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session.id) {
    redirect("/");
  }

  return <>{children}</>;
}
