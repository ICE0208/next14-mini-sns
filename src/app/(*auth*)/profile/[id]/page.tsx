import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import UserProfileComponent from "../../components/user-viewer";

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

const getUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      posts: {
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: {
        select: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return user;
};

export type UserProfile = Prisma.PromiseReturnType<typeof getUser>;

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id: userId } = params;
  const user = await getUser(userId);

  return (
    <main className="flex flex-col items-center py-8">
      <UserProfileComponent user={user} />
    </main>
  );
}
