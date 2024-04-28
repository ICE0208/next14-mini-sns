"use client";

import React, { MouseEvent, useOptimistic, useTransition } from "react";
import { submitLikePost } from "../actions";

interface LikeDisplayProps {
  postId: string;
  initLikeCount: number;
  isLike: boolean;
}

interface Like {
  isLike: boolean;
  count: number;
}

export default function LikeDisplay({
  initLikeCount,
  postId,
  isLike,
}: LikeDisplayProps) {
  const [_, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic<
    Like,
    "ADD" | "REMOVE"
  >({ isLike, count: initLikeCount }, (currentState, optimisticValue) => {
    if (optimisticValue === "ADD") {
      return { count: currentState.count + 1, isLike: true };
    } else {
      return { count: currentState.count - 1, isLike: false };
    }
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (optimisticState.isLike) {
      startTransition(() => addOptimistic("REMOVE"));
      submitLikePost(postId, "REMOVE");
    } else {
      startTransition(() => addOptimistic("ADD"));
      submitLikePost(postId, "ADD");
    }
  };

  return (
    <button className="space-x-[3px]" onClick={handleClick}>
      <span
        className="text-red-500"
        style={{ opacity: optimisticState.isLike ? 1 : 0.4 }}
      >
        ⬆
      </span>
      <span className="text-[14px] font-semibold">
        {optimisticState.count >= 0 ? optimisticState.count : "···"}
      </span>
    </button>
  );
}
