"use client";

import Input from "@/app/(*not-auth*)/components/input";
import { submitCreateAccount } from "./actions";
import { useFormState } from "react-dom";
import Button from "@/app/(*not-auth*)/components/button";
import Link from "next/link";
import BigLogo from "../components/big-logo";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(submitCreateAccount, null);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F0F4F9] px-16 py-8">
      <BigLogo />
      <form
        className="relative flex w-full flex-col items-center rounded-3xl bg-white px-16 py-8"
        action={dispatch}
      >
        <h1 className="mb-6 text-3xl font-normal">회원가입</h1>
        <Input
          placeholder="이메일"
          name="email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <Input
          placeholder="별명"
          name="name"
          errors={state?.fieldErrors.name}
        />
        <Input
          placeholder="비밀번호"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <Input
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          errors={state?.fieldErrors.passwordConfirm}
        />
        <span className="mt-2"></span>
        <Button text="회원가입!" />
        <Link
          className="absolute bottom-8 right-10 border-b-[1.5px] border-black"
          href="/log-in"
        >
          계정이 있어요 &rarr;
        </Link>
      </form>
    </div>
  );
}
