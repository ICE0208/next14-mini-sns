import { DocumentSVG } from "@/icons/document-svg";

export default function PageLoading({
  svg = DocumentSVG,
}: {
  svg?: JSX.Element;
}) {
  return (
    <div className="flex animate-bounce flex-col items-center">
      {svg}
      <span className="text-2xl font-semibold">Loading</span>
    </div>
  );
}
