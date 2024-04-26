"use client";

import { toggleLikePost } from "../actions";

interface LikeDisplayProps {
  postId: string;
  initLike: number;
}

export default function LikeDisplay({ initLike, postId }: LikeDisplayProps) {
  const handleClick = () => {
    toggleLikePost(postId);
  };

  return <button onClick={handleClick}>toggle Like | Like: {initLike}</button>;
}
