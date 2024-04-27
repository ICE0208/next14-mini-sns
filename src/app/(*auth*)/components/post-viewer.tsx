"use client";

import { cls } from "@/lib/utils";
import LikeDisplay from "./like-display";
import TimeDisplay from "./time-display";

interface PostPreviewProps {
  title: string;
  content: string;
  createdAt: Date;
  authorName: string;
  likeCount: number;
  postId: string;
  isLike: boolean;
}

export default function PostViewer({
  title,
  content,
  createdAt,
  authorName,
  likeCount,
  postId,
  isLike,
}: PostPreviewProps) {
  return (
    <div
      className={cls(
        "flex min-h-[300px] w-[520px] flex-col rounded-xl p-6",
        "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
      )}
    >
      <div className="flex w-full flex-col px-1">
        <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[28px] font-medium">
          {title}
        </h2>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-gray-300">
            <div className="translate-y-[3px] text-[16px]">👤</div>
          </div>
          <div className="flex translate-y-[1px] items-center gap-1">
            <span className="text-[16px]">{authorName}</span>
            <span className="font-medium">·</span>
            <TimeDisplay createdAt={createdAt} />
          </div>
        </div>
      </div>
      <div className="my-4 border-b-[1px] border-b-neutral-400" />
      <span className="flex-1 whitespace-pre-wrap break-words px-1 pb-8 font-light">
        {content}
      </span>
      <div className="flex items-center px-1">
        <LikeDisplay
          initLikeCount={likeCount}
          postId={postId}
          isLike={isLike}
        />
      </div>
    </div>
  );
}
