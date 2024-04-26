import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import Header from "./components/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session.id) {
    redirect("/log-in");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
