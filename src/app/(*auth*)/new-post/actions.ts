"use server";

import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

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

  console.log(newPost);

  redirect("/");
};
