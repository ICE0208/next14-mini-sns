import prisma from "@/lib/db";
import PostPreview from "../components/post-preview";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
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
    <main className="">
      <div className="flex flex-col items-center gap-4 py-8">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
            createdAt={post.createdAt}
            likeCount={post._count.likes}
          />
        ))}
      </div>
    </main>
  );
}
