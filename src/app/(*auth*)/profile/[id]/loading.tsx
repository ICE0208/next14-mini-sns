import PageLoading from "@/components/page-loading";
import UserSVG from "@/icons/user-svg";

export default function ProfileLoading() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <PageLoading svg={UserSVG} />
    </main>
  );
}
