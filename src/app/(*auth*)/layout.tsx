import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import Header from "./components/header";
import { Suspense } from "react";
import HeaderSkeleton from "./components/header-skeleton";

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
      <div className="fixed z-50 w-full">
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
      </div>
      <div className="h-16"></div>
      {children}
    </>
  );
}
