import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

const checkPasswords = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const checkUniqueUsername = async (
  { name }: { name: string },
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "This username is already taken",
      path: ["name"],
      fatal: true,
    });
    return z.NEVER;
  }
};

const checkUniqueEmail = async (
  { email }: { email: string },
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "This email is already taken",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
};

const checkWhiteSpace = async (
  {
    name,
    email,
    password,
    passwordConfirm,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  },
  ctx: z.RefinementCtx
) => {
  const pattern = /\s/g;
  if (name.match(pattern)) {
    ctx.addIssue({
      code: "custom",
      message: "공백을 포함해서는 안됩니다.",
      path: ["name"],
      fatal: true,
    });
    return z.NEVER;
  }
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
  if (password.match(pattern)) {
    ctx.addIssue({
      code: "custom",
      message: "공백을 포함해서는 안됩니다.",
      path: ["passwordConfirm"],
      fatal: true,
    });
    return z.NEVER;
  }
};

export const createUserFormSchema = z
  .object({
    name: z.string().toLowerCase().trim(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
    passwordConfirm: z.string(),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["passwordConfirm"],
  })
  .superRefine(checkWhiteSpace)
  .superRefine(checkUniqueEmail)
  .superRefine(checkUniqueUsername);
