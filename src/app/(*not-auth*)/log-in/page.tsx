"use client";

import Input from "@/components/form/input";
import { submitLoginAccount } from "./actions";
import { useFormState } from "react-dom";
import Button from "@/components/form/button";
import Link from "next/link";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(submitLoginAccount, null);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F0F4F9] px-16 py-8">
      <form
        className="relative flex w-full flex-col items-center rounded-3xl bg-white px-16 py-8"
        action={dispatch}
      >
        <h1 className="mb-6 text-3xl font-normal">로그인</h1>
        <Input
          placeholder="이메일"
          name="email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          placeholder="비밀번호"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <span className="mt-2"></span>
        <Button text="로그인!" />
        <Link
          className="absolute bottom-8 right-10 border-b-[1.5px] border-black"
          href="/create-account"
        >
          가입할래요 &rarr;
        </Link>
      </form>
    </div>
  );
}
