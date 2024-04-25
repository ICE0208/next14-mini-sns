"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export const submitLoginAccount = async (formData: FormData) => {
  const email = formData.get("email") + "";
  const name = formData.get("name") + "";
  const password = formData.get("password") + "";
  const passwordConfirm = formData.get("passwordConfirm") + "";

  // ToDo 데이터 타당성 검사 (이메일 타당성, 이메일 별명 중복, 비밀번호 타당성)

  if (!email || !name || !password || !passwordConfirm) {
    console.log("데이터 부족");
    return;
  }
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!user) {
    console.log("해당 유저 없음");
    return;
  }
  if (user.password !== password) {
    console.log("비밀번호 no 일치");
    return;
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  console.log("good");
};
