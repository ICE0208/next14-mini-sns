"use client";

import { redirect } from "next/navigation";
import { UserProfile } from "../profile/[id]/page";
import { useState } from "react";
import PostOnlyTitle from "./post-only-title";

interface UserProfileProps {
  user: UserProfile;
}

export default function UserProfileComponent({ user }: UserProfileProps) {
  if (!user) {
    redirect("/");
  }

  const [select, setSelect] = useState<"POST" | "LIKE">("POST");

  return (
    <div className="w-[320px]">
      <p className="text-xl font-bold">{`${user.name}'s Profile`}</p>
      <p className="text-sm font-extralight">{user.email}</p>
      <div className="my-2 border-b-2 border-black"></div>
      <div className="flex justify-evenly">
        <span
          className="cursor-pointer"
          style={{ fontWeight: select === "POST" ? "bold" : "lighter" }}
          onClick={() => setSelect("POST")}
        >
          작성한 글
        </span>
        <span
          className="cursor-pointer"
          style={{ fontWeight: select === "LIKE" ? "bold" : "lighter" }}
          onClick={() => setSelect("LIKE")}
        >
          좋아요한 글
        </span>
      </div>
      <div className="space-y-2 p-4">
        <>
          {select === "POST" && (
            <>
              {user.posts.map((post) => (
                <PostOnlyTitle key={post.id} id={post.id} title={post.title} />
              ))}
            </>
          )}
          {select === "LIKE" && (
            <>
              {user.likes.map((like) => (
                <PostOnlyTitle
                  key={like.post.id}
                  id={like.post.id}
                  title={like.post.title}
                />
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
}
