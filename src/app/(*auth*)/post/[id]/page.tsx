import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import PostViewer from "../../components/post-viewer";

interface PostViewPageProps {
  params: {
    id: string;
  };
}

const getPost = async (postId: string) => {
  const session = await getSession();
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
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
  });
  return post;
};

export default async function PostViewPage({ params }: PostViewPageProps) {
  const { id: postId } = params;
  const post = await getPost(postId);

  if (!post) {
    redirect("/");
  }

  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    session.destroy();
    return redirect("/log-in");
  }

  return (
    <main className="flex flex-col items-center py-8">
      <PostViewer
        key={post.id}
        title={post.title}
        content={post.content}
        authorName={post.author.name}
        createdAt={post.createdAt}
        likeCount={post._count.likes}
        postId={post.id}
        authorId={post.author.id}
        isLike={post.likes.length > 0}
        userId={userId}
      />
    </main>
  );
}
