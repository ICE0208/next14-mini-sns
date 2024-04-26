import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

const checkWhiteSpace = async (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  ctx: z.RefinementCtx
) => {
  const pattern = /\s/g;
  if (email.match(pattern)) {
    ctx.addIssue({
      code: "custom",
      message: "공백을 포함해서는 안됩니다.",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
  if (password.match(pattern)) {
    ctx.addIssue({
      code: "custom",
      message: "공백을 포함해서는 안됩니다.",
      path: ["password"],
      fatal: true,
    });
    return z.NEVER;
  }
};

export const loginUserFormSchema = z
  .object({
    email: z.string().trim().email().toLowerCase(),
    password: z
      .string()
      .trim()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH),
  })
  .superRefine(checkWhiteSpace);
