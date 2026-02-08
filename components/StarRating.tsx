type StarRatingProps = {
  value: number; // 0..5
  className?: string;
};

export default function StarRating({ value, className = "" }: StarRatingProps) {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div
      className={[
        "flex items-center gap-1 select-none pointer-events-none",
        className,
      ].join(" ")}
      aria-label={`${safeValue} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < safeValue;
        return (
          <span
            key={i}
            className={[
              "leading-none",
              "text-lg sm:text-xl md:text-2xl",
              filled ? "text-[#F5B301]" : "text-gray-300",
            ].join(" ")}
          >
            ★
          </span>
        );
      })}

      <span className="ml-2 text-sm sm:text-base font-semibold text-gray-900">
        {safeValue}
      </span>
    </div>
  );
}
