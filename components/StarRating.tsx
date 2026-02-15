"use client";

<<<<<<< HEAD
type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
=======
import { useState } from "react";

type StarRatingProps = {
  value: number; 
  onChange?: (value: number) => void;
  readOnly?: boolean; 
  className?: string;
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
};

export default function StarRating({
  value,
  onChange,
<<<<<<< HEAD
  size = "md",
}: StarRatingProps) {
  const sizeClass = size === "sm" ? "text-xl" : "text-2xl";

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i} star`}
          onClick={() => onChange(i)}
          className={`${sizeClass} leading-none transition ${
            i <= value ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400`}
        >
          ★
        </button>
      ))}
=======
  readOnly = false,
  className = "",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const safeValue = Math.max(0, Math.min(5, value));
  const displayValue = readOnly ? safeValue : hovered ?? safeValue;

  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const filled = star <= displayValue;

        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => {
              if (readOnly) return;
              onChange?.(star);
            }}
            onMouseEnter={() => {
              if (!readOnly) setHovered(star);
            }}
            onMouseLeave={() => {
              if (!readOnly) setHovered(null);
            }}
            className={readOnly ? "cursor-default" : "cursor-pointer"}
            aria-label={`${star} star`}
          >
            <span
              className={[
                "leading-none",
                "text-lg sm:text-xl md:text-2xl",
                filled ? "text-[#F5B301]" : "text-gray-300",
              ].join(" ")}
            >
              ★
            </span>
          </button>
        );
      })}

      <span className="ml-2 text-sm sm:text-base font-semibold text-gray-900">
        {safeValue}
      </span>
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
    </div>
  );
}
