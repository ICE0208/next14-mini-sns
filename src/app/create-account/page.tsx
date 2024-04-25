"use client";

import InputWithLabel from "@/components/form/input";
import { submitCreateAccount } from "./actions";
import { useFormState } from "react-dom";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(submitCreateAccount, null);

  console.log(state);

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form
        className="flex flex-col"
        action={dispatch}
      >
        <InputWithLabel
          labelText="이메일"
          name="email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <InputWithLabel
          labelText="별명"
          name="name"
          errors={state?.fieldErrors.name}
        />
        <InputWithLabel
          labelText="비밀번호"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <InputWithLabel
          labelText="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          errors={state?.fieldErrors.passwordConfirm}
        />
        <button>회원가입!</button>
      </form>
    </div>
  );
}
