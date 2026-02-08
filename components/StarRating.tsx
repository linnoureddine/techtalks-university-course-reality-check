"use client";

import { useState } from "react";

type StarRatingProps = {
  value: number;
  size?: number;
  showNumber?: boolean;
};

export default function StarRating({
  value,
  size = 22,
  showNumber = true,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const activeValue = hovered ?? value;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="p-0.5"
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={star <= activeValue ? "#FBBF24" : "#E5E7EB"}
              xmlns="http://www.w3.org/2000/svg"
              className="transition"
            >
              <path d="M12 17.3l-5.6 3.2 1.5-6.4L2.8 9.6l6.6-.6L12 3l2.6 6 6.6.6-5.1 4.5 1.5 6.4L12 17.3z" />
            </svg>
          </button>
        ))}
      </div>

      {showNumber && (
        <span className="text-lg font-semibold text-gray-900">{value}</span>
      )}
    </div>
  );
}