import prisma from "@/lib/db";
import PostPreview from "../components/post-preview";
import { cls } from "@/lib/utils";
import Link from "next/link";
import getSession from "@/lib/session";
const getPosts = async () => {
  const session = await getSession();
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: session.id,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="relative">
      <div className="flex flex-col items-center gap-4 py-8">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
            createdAt={post.createdAt}
            likeCount={post._count.likes}
            postId={post.id}
            authorId={post.author.id}
            isLike={post.likes.length > 0}
          />
        ))}
      </div>
      <Link
        href="/new-post"
        className={cls(
          "fixed bottom-8 right-8 flex size-4 items-center justify-center text-3xl",
          "rounded-full bg-white p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]",
          "border-[1.6px] border-neutral-300 hover:border-neutral-400",
          "transition ease-in-out hover:scale-105",
        )}
      >
        <span className="rotate-[80deg]">✎</span>
      </Link>
    </main>
  );
}
