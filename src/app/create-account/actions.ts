"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createUserFormSchema } from "./validations";
import { typeToFlattenedError } from "zod";

type FormState = typeToFlattenedError<
  {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  },
  string
> | null;

export const submitCreateAccount = async (
  prevState: FormState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await createUserFormSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    console.log("good");
    redirect("/log-in");
  }
};
