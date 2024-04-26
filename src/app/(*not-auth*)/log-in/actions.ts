"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { loginUserFormSchema } from "./validations";
import { typeToFlattenedError } from "zod";

type FormState =
  | typeToFlattenedError<
      {
        email: string;
        password: string;
      },
      string
    >
  | {
      fieldErrors: {
        password: string[];
        email: string[];
      };
    }
  | null;

export const submitLoginAccount = async (
  formState: FormState,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginUserFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 비밀번호 확인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return {
        fieldErrors: {
          email: ["가입된 정보가 없습니다."],
          password: [],
        },
      };
    }

    const ok = await bcrypt.compare(result.data.password, user.password);

    if (ok) {
      // 비밀번호 ok -> LOGIN
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      // 비밀번호 not ok -> ERROR
      return {
        fieldErrors: {
          email: [],
          password: ["비밀번호가 잘못된 듯 합니다."],
        },
      };
    }
  }
};
