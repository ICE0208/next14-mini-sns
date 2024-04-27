"use client";

import { cls } from "@/lib/utils";
import { submitNewPost } from "./actions";
import { useRef, useState, useTransition } from "react";

export default function NewPostPage() {
  const [pending, startTransition] = useTransition();
  const handleSubmit = async (formData: FormData) => {
    if (pending) return;
    startTransition(async () => {
      await submitNewPost(formData);
    });
  };

  return (
    <main className="flex flex-col items-center py-8">
      <form action={handleSubmit}>
        <div
          className={cls(
            "flex min-h-[500px] w-[520px] flex-col rounded-xl p-6",
            "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          )}
        >
          <input
            className={cls(
              "flex w-full items-center rounded-lg p-2 text-[20px] font-medium focus:outline-none",
              "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
            )}
            name="title"
            placeholder="제목"
            required
          />

          <div className="my-3 border-b-[1px] border-b-neutral-300" />
          <textarea
            className={cls(
              "flex-1 resize-none break-words rounded-lg p-2 font-light focus:outline-none",
              "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
            )}
            name="content"
            placeholder="내용을 입력하세요."
            required
          />
          <button
            className={cls(
              "mt-3 flex items-center self-start rounded-lg px-[20px] py-[6px] font-light",
              "bg-neutral-200 transition ease-in-out hover:bg-neutral-300",
              "disabled:bg-neutral-400",
            )}
            disabled={pending}
          >
            등록
          </button>
        </div>
      </form>
    </main>
  );
}
