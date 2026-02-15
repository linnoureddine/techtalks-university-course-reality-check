"use client";

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
};

export default function StarRating({
  value,
  onChange,
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
    </div>
  );
}
