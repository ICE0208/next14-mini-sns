"use server";

import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export const toggleLikePost = async (postId: string) => {
  const session = await getSession();
  if (!session || !session.id) {
    console.log("no session");
    return;
  }

  const userId = session.id;

  const isAlreadyLike = Boolean(
    await prisma.like.findUnique({
      where: {
        postId,
        userId,
      },
      select: {
        id: true,
      },
    }),
  );

  if (isAlreadyLike) {
    await prisma.like.delete({
      where: {
        postId,
        userId,
      },
    });
    console.log("좋아요 지워짐");
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    console.log("좋아요 추가됨");
  }
  revalidatePath("/");
};
