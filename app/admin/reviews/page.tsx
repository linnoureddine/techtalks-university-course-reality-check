"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Star,
  Trash2,
  ChevronDown,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";

type Metric = {
  label: string;
  value: number;
  tone: "blue" | "green" | "yellow" | "purple";
};

type ReviewRow = {
  id: string;
  course: string;
  professor: string;
  reviewText: string;
  rating: number;
  metrics: Metric[];
  upvotes: number;
  downvotes: number;
  date: string;
  reviewUser: string;
  commentUser: string;
};

function toneClasses(tone: Metric["tone"]) {
  switch (tone) {
    case "blue":
      return "bg-blue-100 text-blue-700";
    case "green":
      return "bg-green-100 text-green-700";
    case "yellow":
      return "bg-yellow-100 text-yellow-800";
    case "purple":
      return "bg-purple-100 text-purple-700";
  }
}

function clampText(text: string, max = 44) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function VotesDisplay({
  upvotes,
  downvotes,
}: {
  upvotes: number;
  downvotes: number;
}) {
  const score = upvotes - downvotes;

  return (
    <div className="inline-flex items-center gap-2 text-gray-700">
      <ArrowBigUp size={20} className="text-gray-400" />
      <span className="min-w-[22px] text-center font-semibold text-gray-800">
        {score}
      </span>
      <ArrowBigDown size={20} className="text-gray-400" />
    </div>
  );
}

export default function AdminReviewsPage() {
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<
    "all" | "5" | "4" | "3" | "2" | "1"
  >("all");

  const reviews: ReviewRow[] = [
    {
      id: "r1",
      course: "Data Structure and Algorithms",
      professor: "Dr. Sarah Mitchell",
      reviewText:
        "This course was tough but rewarding. Dr. Mitchell is passionate about the subject and genuinely wants students to succeed.",
      rating: 4.6,
      metrics: [
        { label: "Exam", value: 4, tone: "blue" },
        { label: "Workload", value: 4, tone: "green" },
        { label: "Attendance", value: 3, tone: "yellow" },
        { label: "Grading", value: 5, tone: "purple" },
      ],
      upvotes: 47,
      downvotes: 23,
      date: "1/15/2024",
      reviewUser: "Aya Harb",
      commentUser: "Rein El Zein",
    },
    {
      id: "r2",
      course: "Calculus II",
      professor: "Dr. John Smith",
      reviewText:
        "Great explanations and lots of practice problems. Highly recommended.",
      rating: 4.2,
      metrics: [
        { label: "Exam", value: 3, tone: "blue" },
        { label: "Workload", value: 4, tone: "green" },
        { label: "Attendance", value: 2, tone: "yellow" },
        { label: "Grading", value: 4, tone: "purple" },
      ],
      upvotes: 31,
      downvotes: 6,
      date: "2/03/2024",
      reviewUser: "Nour Haddad",
      commentUser: "Aya Harb",
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return reviews.filter((r) => {
      const matchesQuery =
        !q ||
        r.course.toLowerCase().includes(q) ||
        r.professor.toLowerCase().includes(q) ||
        r.reviewText.toLowerCase().includes(q) ||
        r.reviewUser.toLowerCase().includes(q) ||
        r.commentUser.toLowerCase().includes(q);

      const matchesRating =
        ratingFilter === "all"
          ? true
          : Math.floor(r.rating).toString() === ratingFilter;

      return matchesQuery && matchesRating;
    });
  }, [query, ratingFilter, reviews]);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Review Management
            </h1>
            <p className="mt-2 text-gray-500">
              Manage platform reviews and moderate content.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-[340px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reviews..."
                className="w-full h-11 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none"
              />
            </div>

            {/* Filter */}
            <div className="relative w-full sm:w-[170px]">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value as any)}
                className="w-full h-11 rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none appearance-none"
              >
                <option value="all">All ratings</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
                <option value="1">1+</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Table container */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          {/* Desktop table */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[220px_150px_220px_110px_220px_90px_95px_70px] px-6 py-4 text-xs text-gray-500">
              <div>Course</div>
              <div>Professor</div>
              <div>Review</div>
              <div>Rating</div>
              <div>Metrics</div>
              <div>Votes</div>
              <div>Date</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="h-px bg-gray-100" />

            {filtered.map((r) => (
              <div key={r.id}>
                <div className="grid grid-cols-[220px_150px_220px_110px_220px_90px_95px_70px] px-6 py-5 items-center text-sm">
                  {/* Course + users */}
                  <div className="min-w-0">
                    <div className="font-semibold text-black leading-snug break-words">
                      {r.course}
                    </div>

                    <div className="mt-2 text-[11px] text-gray-500 space-y-1">
                      <div className="truncate">
                        Review by{" "}
                        <span className="font-medium text-gray-700">
                          {r.reviewUser}
                        </span>
                      </div>
                      <div className="truncate">
                        Comment by{" "}
                        <span className="font-medium text-gray-700">
                          {r.commentUser}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professor */}
                  <div className="text-gray-700 truncate min-w-0">
                    {r.professor}
                  </div>

                  {/* Review */}
                  <div className="text-gray-700 min-w-0">
                    {clampText(r.reviewText, 34)}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Star size={16} className="text-gray-400" />
                    <span className="font-medium">{r.rating.toFixed(1)}</span>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    {r.metrics.map((m) => (
                      <span
                        key={m.label}
                        className={`px-2 py-0.5 rounded-md text-xs ${toneClasses(
                          m.tone,
                        )}`}
                      >
                        {m.label}:{m.value}
                      </span>
                    ))}
                  </div>

                  {/* Votes */}
                  <VotesDisplay upvotes={r.upvotes} downvotes={r.downvotes} />

                  {/* Date */}
                  <div className="text-gray-700 text-xs">{r.date}</div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-gray-50"
                      aria-label="Delete review"
                      onClick={() =>
                        alert(`Delete clicked for ${r.id} (hook API later).`)
                      }
                    >
                      <Trash2 size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-10 text-center text-sm text-gray-500">
                No reviews found.
              </div>
            )}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden p-4 sm:p-6 space-y-4">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-black break-words">
                      {r.course}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {r.professor}
                    </div>

                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                      <div>
                        Review by{" "}
                        <span className="font-medium text-gray-700">
                          {r.reviewUser}
                        </span>
                      </div>
                      <div>
                        Comment by{" "}
                        <span className="font-medium text-gray-700">
                          {r.commentUser}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-gray-50"
                    aria-label="Delete review"
                    onClick={() =>
                      alert(`Delete clicked for ${r.id} (hook API later).`)
                    }
                  >
                    <Trash2 size={18} className="text-gray-500" />
                  </button>
                </div>

                <p className="mt-4 text-gray-700">{r.reviewText}</p>

                <div className="mt-4 flex items-center gap-2 text-gray-700">
                  <Star size={18} className="text-gray-400" />
                  <span className="font-medium">{r.rating.toFixed(1)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{r.date}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.metrics.map((m) => (
                    <span
                      key={m.label}
                      className={`px-3 py-1 rounded-lg text-sm ${toneClasses(
                        m.tone,
                      )}`}
                    >
                      {m.label}:{m.value}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <VotesDisplay upvotes={r.upvotes} downvotes={r.downvotes} />
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-10">
                No reviews found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
