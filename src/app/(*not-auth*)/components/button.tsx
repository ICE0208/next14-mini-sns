"use client";

import { cls } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({
  text,
  onClick,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cls(
        "rounded-xl bg-blue-600 px-6 py-2 text-white",
        "hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400",
      )}
      onClick={onClick}
      disabled={pending}
    >
      {pending ? "로딩중!" : text}
    </button>
  );
}
