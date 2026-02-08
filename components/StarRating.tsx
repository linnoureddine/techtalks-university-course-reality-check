"use client";

import { useState } from "react";

type StarRatingProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export default function StarRating({ value = 0, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= displayValue ? "#FBBF24" : "#E5E7EB"}
              className="h-7 w-7 transition"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        ))}
      </div>

      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  );
}
