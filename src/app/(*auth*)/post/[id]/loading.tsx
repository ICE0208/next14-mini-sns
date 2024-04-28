import { cls } from "@/lib/utils";
import TimeDisplay from "../../components/time-display";
import LikeDisplay from "../../components/like-display";

export default function PostDetailLoding() {
  return (
    <main className="flex flex-col items-center py-8">
      <div
        className={cls(
          "flex min-h-[300px] w-[520px] select-none flex-col rounded-xl p-6",
          "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        )}
      >
        <div className="flex w-full flex-col px-1">
          <div className="flex h-[42px] w-2/6 items-center">
            <div className="h-[24px] w-full animate-pulse rounded-2xl bg-neutral-300"></div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              <div className="translate-y-[3px] text-[16px]">👤</div>
            </div>
            <div className="flex translate-y-[1px] items-center gap-1">
              <div className="flex h-[24px] w-[55px] items-center">
                <div className="h-[14px] w-full animate-pulse rounded-2xl bg-neutral-300"></div>
              </div>
              <span className="font-medium">·</span>
              <div className="flex h-[16px] w-[55px] items-center">
                <div className="h-[10px] w-full animate-pulse rounded-2xl bg-neutral-300"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 border-b-[1px] border-b-neutral-400" />
        <span className="flex-1 whitespace-pre-wrap break-words px-1 pb-8 font-light">
          <div className="flex w-full flex-col gap-[8px]">
            <div className="h-[13px] w-9/12 animate-pulse rounded-2xl bg-neutral-300"></div>
            <div className="h-[13px] w-7/12 animate-pulse rounded-2xl bg-neutral-300"></div>
            <div className="h-[13px] w-3/12 animate-pulse rounded-2xl bg-neutral-300"></div>
          </div>
        </span>
        <div className="flex items-center px-1">
          <LikeDisplay initLikeCount={-1} postId="-1" isLike={false} />
        </div>
      </div>
    </main>
  );
}
