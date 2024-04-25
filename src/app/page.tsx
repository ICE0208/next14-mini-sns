import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";

const getUserName = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: { name: true },
    });
    if (!user) {
      return "뭔가 이상함";
    }
    return user.name;
  }
  return "로그인 안되어 있음";
};

export default async function Home() {
  const user = await getUserName();

  return <main className="">{user}</main>;
}
