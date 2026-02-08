"use client";

import { useMemo, useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

type ReviewFooterBarProps = {
  initialVotes?: number;
  timeAgo?: string;
};

export default function ReviewFooterBar({
  initialVotes = 24,
  timeAgo = "2 weeks ago",
}: ReviewFooterBarProps) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const votes = useMemo(() => {
    if (vote === "up") return initialVotes + 1;
    if (vote === "down") return initialVotes - 1;
    return initialVotes;
  }, [vote, initialVotes]);

  function handleUpvote() {
    setVote((prev) => (prev === "up" ? null : "up"));
  }

  function handleDownvote() {
    setVote((prev) => (prev === "down" ? null : "down"));
  }

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUpvote}
            className="transition active:scale-95"
            aria-label="Upvote"
          >
            <ArrowBigUp
              className={`h-7 w-7 ${
                vote === "up" ? "text-green-600" : "text-gray-400"
              }`}
            />
          </button>

          <span className="text-base font-medium text-gray-700">{votes}</span>

          <button
            type="button"
            onClick={handleDownvote}
            className="transition active:scale-95"
            aria-label="Downvote"
          >
            <ArrowBigDown
              className={`h-7 w-7 ${
                vote === "down" ? "text-gray-700" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="text-base text-gray-500">{timeAgo}</div>
      </div>
    </div>
  );
}
