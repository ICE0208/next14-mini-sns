import PageLoading from "@/components/page-loading";
import ClipboardSVG from "@/icons/clipboard-svg";

export default function NotAuthLoading() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <PageLoading svg={ClipboardSVG} />
    </main>
  );
}
