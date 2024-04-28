"use client";

import { cls } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors,
  placeholder,
  type = "text",
  required = true,
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState("");

  return (
    <div className="group relative mt-3">
      <span
        className={cls(
          "absolute -top-[10px] left-[16px] bg-white px-1 text-[14px] font-medium opacity-0",
          "group-focus-within:text-blue-700 group-focus-within:opacity-100",
        )}
        style={{
          ...(value ? { opacity: 100 } : {}),
          ...(errors && errors?.length > 0 ? { color: "#de413e" } : {}),
        }}
      >
        {placeholder}
      </span>
      <input
        className={cls(
          "w-[300px] rounded-[20px] border-[1.5px] border-black px-4 py-3",
          "placeholder:text-neutral-600 focus:outline-blue-700 focus:placeholder:opacity-0",
        )}
        style={{
          ...(errors && errors?.length > 0
            ? { borderColor: "#de413e", outlineWidth: 0 }
            : {}),
        }}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <div className="min-h-[18px]">
        {errors && errors?.length > 0 && (
          <span className="text-[14px] text-[#de413e]">{errors[0]}</span>
        )}
      </div>
    </div>
  );
}
