import InputWithLabel from "@/components/form/input";
import { submitLoginAccount } from "./actions";

export default function CreateAccountPage() {
  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form
        className="flex flex-col"
        action={submitLoginAccount}
      >
        <InputWithLabel
          labelText="이메일"
          name="email"
          type="email"
        />
        <InputWithLabel
          labelText="비밀번호"
          name="password"
          type="password"
        />
        <button>로그인!</button>
      </form>
    </div>
  );
}
