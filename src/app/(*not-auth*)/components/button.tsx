import { cls } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  text: string;
}

export default function Button({
  text,
  onClick,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cls(
        "rounded-xl bg-blue-600 px-6 py-2 text-white",
        "hover:bg-blue-700",
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
