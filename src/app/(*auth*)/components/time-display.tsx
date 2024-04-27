"use client";

import { formatToTimeAgo } from "@/lib/utils";
import { useLayoutEffect, useState } from "react";

interface TimeDisplayProps {
  createdAt: Date;
}

export default function TimeDisplay({ createdAt }: TimeDisplayProps) {
  const [timeText, setTimeText] = useState("");
  useLayoutEffect(() => {
    setTimeText(formatToTimeAgo(createdAt.toString()));
  }, [createdAt]);

  return <span className="text-[14px] font-light">{timeText}</span>;
}
