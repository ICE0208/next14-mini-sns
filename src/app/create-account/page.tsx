import InputWithLabel from "@/components/form/input";
import { submitCreateAccount } from "./actions";

export default function CreateAccountPage() {
  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form
        className="flex flex-col"
        action={submitCreateAccount}
      >
        <InputWithLabel
          labelText="이메일"
          name="email"
          type="email"
        />
        <InputWithLabel
          labelText="별명"
          name="name"
        />
        <InputWithLabel
          labelText="비밀번호"
          name="password"
          type="password"
        />
        <InputWithLabel
          labelText="비밀번호 확인"
          name="passwordConfirm"
          type="password"
        />
        <button>회원가입!</button>
      </form>
    </div>
  );
}
