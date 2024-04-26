import { cls, formatToTimeAgo } from "@/lib/utils";

interface PostPreviewProps {
  title: string;
  content: string;
  createdAt: Date;
  authorName: string;
  likeCount: number;
}

export default function PostPreview({
  title,
  content,
  createdAt,
  authorName,
  likeCount,
}: PostPreviewProps) {
  return (
    <div
      className={cls(
        "flex min-h-[200px] w-[520px] flex-col rounded-xl p-6",
        "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
      )}
    >
      <div className="flex w-full items-center px-1">
        <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[20px] font-medium">
          {title}
        </h2>
        <span className="mx-1 font-medium">·</span>
        <span className="text-[14px] font-light">{authorName}</span>
      </div>
      <div className="my-2 border-b-[1px] border-b-neutral-400" />
      <span className="flex-1 break-words px-1 font-light">{content}</span>
      <div className="flex items-center px-1">
        <span>Like: {likeCount}</span>
        <span className="mx-1 font-medium">·</span>
        <span className="text-[14px] font-light">
          {formatToTimeAgo(createdAt.toString())}
        </span>
      </div>
    </div>
  );
}
