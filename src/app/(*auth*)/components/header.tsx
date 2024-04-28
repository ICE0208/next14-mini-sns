import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: { id: true, name: true },
    });
    if (!user) {
      session.destroy();
      return null;
    }
    return user;
  }
  return null;
};

export default async function Header() {
  const user = await getUser();

  if (!user) {
    return redirect("/log-in");
  }

  return (
    <div className="flex h-16 items-center justify-between bg-white px-4 text-lg">
      <div>
        <Link href="/" className="text-2xl font-bold">
          <h1>Mini SNS</h1>
        </Link>
      </div>
      <div className="flex gap-1">
        <div>
          <span className="font-extralight">Hello, </span>
          <Link href={`/profile/${user.id}`} className="font-medium">
            {user.name}
          </Link>
        </div>
        <span className="mx-[2px] font-extralight">|</span>
        <form
          action={async () => {
            "use server";
            const session = await getSession();
            session.destroy();
            redirect("/log-in");
          }}
        >
          <button className="">로그아웃</button>
        </form>
      </div>
    </div>
  );
}
