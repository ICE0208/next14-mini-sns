"use server";

import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export const submitLikePost = async (
  postId: string,
  type: "ADD" | "REMOVE",
) => {
  const session = await getSession();
  if (!session || !session.id) {
    console.log("no session");
    return;
  }

  const userId = session.id;

  const isAlreadyLike = Boolean(
    await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
      select: {
        id: true,
      },
    }),
  );

  if (isAlreadyLike && type === "REMOVE") {
    await prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });
  } else if (!isAlreadyLike && type === "ADD") {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }
  revalidatePath("/");
};
