"use client";

import { useState } from "react";

type VoteValue = 1 | -1 | 0;

type ReviewFooterBarProps = {
  initialScore?: number;        
  initialUserVote?: VoteValue;  
  timeAgo?: string;             
  onVoteChange?: (vote: VoteValue) => void;
};

export default function ReviewFooterBar({
  initialScore = 0,
  initialUserVote = 0,
  timeAgo = "just now",
  onVoteChange,
}: ReviewFooterBarProps) {
  const [userVote, setUserVote] = useState<VoteValue>(initialUserVote);
  const [score, setScore] = useState<number>(initialScore);

  const upActive = userVote === 1;
  const downActive = userVote === -1;

  const upColor = upActive ? "text-green-600" : "text-gray-400";
  const downColor = downActive ? "text-gray-700" : "text-gray-400";

  const handleUp = () => {
    if (userVote === 1) {
      setUserVote(0);
      setScore((s) => s - 1);
      onVoteChange?.(0);
      return;
    }
    if (userVote === -1) {
      setScore((s) => s + 2);
    } else {
      setScore((s) => s + 1);
    }
    setUserVote(1);
    onVoteChange?.(1);
  };

  const handleDown = () => {
    if (userVote === -1) {
      setUserVote(0);
      setScore((s) => s + 1);
      onVoteChange?.(0);
      return;
    }
    if (userVote === 1) {
      setScore((s) => s - 2);
    } else {
      setScore((s) => s - 1);
    }
    setUserVote(-1);
    onVoteChange?.(-1);
  };

  return (
    <div className="mt-4">
      <div className="border-t border-gray-200" />

      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUp}
            className={`inline-flex items-center ${upColor} hover:opacity-80`}
            aria-label="Upvote"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l7 8h-4v8H9v-8H5l7-8z" />
            </svg>
          </button>

          <span className="text-sm font-medium text-gray-900">{score}</span>

          <button
            type="button"
            onClick={handleDown}
            className={`inline-flex items-center ${downColor} hover:opacity-80`}
            aria-label="Downvote"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20l-7-8h4V4h6v8h4l-7 8z" />
            </svg>
          </button>
        </div>

        <span className="text-sm text-gray-500">{timeAgo}</span>
      </div>
    </div>
  );
}
