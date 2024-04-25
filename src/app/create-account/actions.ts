"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const submitCreateAccount = async (formData: FormData) => {
  const email = formData.get("email") + "";
  const name = formData.get("name") + "";
  const password = formData.get("password") + "";
  const passwordConfirm = formData.get("passwordConfirm") + "";

  // ToDo 데이터 타당성 검사 (이메일 타당성, 이메일 별명 중복, 비밀번호 타당성, 비밀번호 일치 등...)

  if (!email || !name || !password || !passwordConfirm) {
    console.log("데이터 부족");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  console.log(user);

  console.log("good");
  redirect("/log-in");
};
