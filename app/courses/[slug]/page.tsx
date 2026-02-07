"use client";

import { useState } from "react";
import WriteReviewCard from "@/components/WriteReviewCard";
import ReviewFooterBar from "@/components/ReviewFooterBar";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-900">{value}</span>

      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const star = i + 1;
          const active = star <= shown;

          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="p-0.5"
              aria-label={`Rate ${star} star`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={active ? "text-yellow-400" : "text-gray-300"}
              >
                <path d="M12 17.27l-5.18 3.05 1.39-5.81L3 9.24l5.9-.5L12 3.5l3.1 5.24 5.9.5-5.21 5.27 1.39 5.81L12 17.27z" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StudentReviews() {
    const [rating, setRating] = useState(5);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Student Reviews{" "}
          <span className="text-gray-500 font-normal">(2)</span>
        </h2>

        <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Student352372</h3>
              <p className="text-sm text-gray-500">
                Taken Fall 2023 · Instructor: Dr. Lama Affara
              </p>
            </div>

            <StarRating value={rating} onChange={setRating} />
          </div>

          <p className="mt-4 text-gray-700 leading-7">
            The Animation Tools course was manageable in terms of difficulty and
            well-structured for beginners...
          </p>

          <div className="mt-5 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 md:grid-cols-4">
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Exam:</span>
                <span className="font-medium">4/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Workload:</span>
                <span className="font-medium">4/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Attendance:</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Grading:</span>
                <span className="font-medium">5/5</span>
              </div>
            </div>
          </div>

          <ReviewFooterBar initialScore={24} timeAgo="2 weeks ago" />
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <WriteReviewCard />
        <StudentReviews />
      </section>
    </main>
  );
}
