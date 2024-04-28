"use server";

import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const submitDeletePost = async (postId: string) => {
  const session = await getSession();
  const userId = session.id;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!post) {
    console.log("no 포스트");
    return "삭제할 포스트가 없음";
  }
  if (userId !== post.authorId) {
    console.log("no 권한");
    return "권한이 없음";
  }

  await prisma.post.delete({
    where: {
      id: post.id,
    },
  });

  console.log("삭제 완료");
  revalidatePath("/");
};

export const submitNewPost = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  // ToDo - Form 내용 검사

  const session = await getSession();
  if (!session || !session.id) {
    console.log("no session");
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    console.log("해당 user가 db에 없음.");
    return;
  }

  const newPost = await prisma.post.create({
    data: {
      title: data.title + "",
      content: data.content + "",
      authorId: session.id,
    },
  });

  redirect("/");
};
