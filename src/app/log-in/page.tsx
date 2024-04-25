"use client";

import InputWithLabel from "@/components/form/input";
import { submitLoginAccount } from "./actions";
import { useFormState } from "react-dom";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(submitLoginAccount, null);

  return (
    <div>
      <h1>로그인 페이지</h1>
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
          labelText="비밀번호"
          name="password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <button>로그인!</button>
      </form>
    </div>
  );
}
