"use client";

import { cls } from "@/lib/utils";
import LikeDisplay from "./like-display";
import { useRouter } from "next/navigation";
import TimeDisplay from "./time-display";
import { MouseEvent } from "react";

interface PostPreviewProps {
  title: string;
  content: string;
  createdAt: Date;
  authorName: string;
  likeCount: number;
  postId: string;
  authorId: string;
  isLike: boolean;
}

export default function PostPreview({
  title,
  content,
  createdAt,
  authorName,
  likeCount,
  postId,
  authorId,
  isLike,
}: PostPreviewProps) {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/post/${postId}`);
  };

  const handleUserClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    router.push(`/profile/${authorId}`);
  };

  return (
    <div
      className={cls(
        "flex min-h-[200px] w-[520px] select-none flex-col rounded-xl p-6",
        "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
      )}
      onClick={handlePostClick}
    >
      <div className="flex w-full items-center px-1">
        <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[20px] font-medium">
          {title}
        </h2>
        <span className="mx-1 font-medium">·</span>
        <span
          className="cursor-pointer text-[14px] font-light"
          onClick={handleUserClick}
        >
          {authorName}
        </span>
      </div>
      <div className="my-2 border-b-[1px] border-b-neutral-400" />
      <span className="flex-1 whitespace-pre-wrap break-words px-1 font-light">
        {content}
      </span>
      <div className="flex items-center px-1">
        <LikeDisplay
          initLikeCount={likeCount}
          postId={postId}
          isLike={isLike}
        />
        <span className="mx-1 font-medium">·</span>
        <TimeDisplay createdAt={createdAt} />
      </div>
    </div>
  );
}
