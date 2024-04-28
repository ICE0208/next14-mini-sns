import { useRouter } from "next/navigation";

interface PostOnlyTitleProps {
  id: string;
  title: string;
}

export default function PostOnlyTitle({ id, title }: PostOnlyTitleProps) {
  const router = useRouter();

  return (
    <div
      className="w-full cursor-pointer rounded-2xl border-2 border-black p-4"
      onClick={() => router.push(`/post/${id}`)}
    >
      <div className="overflow-hidden text-ellipsis text-nowrap">{title}</div>
    </div>
  );
}
