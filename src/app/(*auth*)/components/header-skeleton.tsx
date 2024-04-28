import getSession from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HeaderSkeleton() {
  return (
    <div className="flex h-16 items-center justify-between bg-white px-4 text-lg">
      <div>
        <Link href="/" className="text-2xl font-bold">
          <h1>Mini SNS</h1>
        </Link>
      </div>
      <div className="flex gap-1">
        <div className="flex gap-[4px]">
          <span className="font-light">로딩중</span>
          <div className="mx-[4px] animate-spin text-[8px] font-semibold">
            |
          </div>
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
