"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Search,
  Star,
  Trash2,
  ChevronDown,
  ArrowBigUp,
  ArrowBigDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

// Matches: review JOIN user JOIN course JOIN department JOIN university + aggregated review_vote counts
type ReviewRow = {
  review_id: string;
  reviewer_name: string;
  reviewer_email: string;
  course_code: string;
  course_title: string;
  university: string;
  department: string;
  semester_taken: string;
  review_text: string;
  instructor_name: string;
  overall_rating: number;
  grading_rating: number;
  workload_rating: number;
  attendance_rating: number;
  exam_difficulty_rating: number;
  upvotes: number;
  downvotes: number;
  created_at: string;
};

type SortKey =
  | "newest"
  | "oldest"
  | "rating_high"
  | "rating_low"
  | "most_votes";

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function RatingStars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star size={size} className="text-amber-400 fill-amber-400" />
      <span className="font-medium text-gray-800 text-sm">
        {value.toFixed(2)}
      </span>
    </div>
  );
}

function VoteDisplay({
  upvotes,
  downvotes,
}: {
  upvotes: number;
  downvotes: number;
}) {
  const score = upvotes - downvotes;
  return (
    <div className="flex items-center gap-1 text-gray-600">
      <ArrowBigUp size={15} className="text-gray-400" />
      <span className="text-sm font-semibold w-5 text-center">{score}</span>
      <ArrowBigDown size={15} className="text-gray-400" />
    </div>
  );
}

function MetricBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${color}`}
    >
      {label}: {value}
    </span>
  );
}

function ReviewDetailModal({
  review,
  onClose,
  onDelete,
}: {
  review: ReviewRow;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const netVotes = review.upvotes - review.downvotes;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900">
              {review.course_code} — {review.course_title}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              {review.department} · {review.university}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Reviewer</p>
              <p className="text-gray-800 font-medium">
                {review.reviewer_name}
              </p>
              <p className="text-xs text-gray-400">{review.reviewer_email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Instructor</p>
              <p className="text-gray-800 font-medium">
                {review.instructor_name}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Semester</p>
              <p className="text-gray-800 font-medium">
                {review.semester_taken}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Submitted</p>
              <p className="text-gray-800 font-medium">{review.created_at}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1.5">Review</p>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3 border border-gray-100">
              {review.review_text}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">Overall rating</p>
              <RatingStars value={review.overall_rating} size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Community votes</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <ArrowBigUp size={16} /> {review.upvotes}
                </span>
                <span className="flex items-center gap-1 text-red-500">
                  <ArrowBigDown size={16} /> {review.downvotes}
                </span>
                <span className="text-gray-500">
                  Net:{" "}
                  <span className="font-semibold text-gray-800">
                    {netVotes > 0 ? `+${netVotes}` : netVotes}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Rating breakdown</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "Exam difficulty",
                  value: review.exam_difficulty_rating,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  label: "Workload",
                  value: review.workload_rating,
                  color: "bg-green-100 text-green-800",
                },
                {
                  label: "Attendance",
                  value: review.attendance_rating,
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  label: "Grading",
                  value: review.grading_rating,
                  color: "bg-purple-100 text-purple-800",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className={`rounded-lg px-3 py-2 ${m.color}`}
                >
                  <p className="text-[11px] opacity-70">{m.label}</p>
                  <p className="text-base font-semibold">
                    {m.value}{" "}
                    <span className="text-xs font-normal opacity-60">/ 5</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5 text-xs text-gray-400">
            review_id:{" "}
            <span className="text-gray-600 font-mono">{review.review_id}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100">
          <button
            onClick={() => {
              onDelete(review.review_id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-md text-red-600 border border-red-200 hover:bg-red-50 transition"
          >
            <Trash2 size={14} /> Delete review
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Seed data — defined at module level so it is referentially stable.
// TO INTEGRATE: remove SEED_REVIEWS entirely and initialise reviews state
// from your API: useState<ReviewRow[]>([]) + useEffect fetch call below.
// ---------------------------------------------------------------------------
const SEED_REVIEWS: ReviewRow[] = [
  {
    review_id: "r1",
    reviewer_name: "Aya Harb",
    reviewer_email: "aya.harb@aub.edu.lb",
    course_code: "CMPS 214",
    course_title: "Data Structures and Algorithms",
    university: "American University of Beirut",
    department: "Computer Science",
    semester_taken: "Fall 2023",
    review_text:
      "This course was tough but rewarding. Dr. Mitchell is passionate about the subject and genuinely wants students to succeed. The assignments pushed me to think algorithmically in ways I hadn't before. Office hours were incredibly helpful and the TAs were knowledgeable.",
    instructor_name: "Dr. Sarah Mitchell",
    overall_rating: 4.6,
    grading_rating: 5.0,
    workload_rating: 4.0,
    attendance_rating: 3.0,
    exam_difficulty_rating: 4.0,
    upvotes: 47,
    downvotes: 23,
    created_at: "2024-01-15",
  },
  {
    review_id: "r2",
    reviewer_name: "Nour Haddad",
    reviewer_email: "nour.haddad@aub.edu.lb",
    course_code: "MATH 201",
    course_title: "Calculus II",
    university: "American University of Beirut",
    department: "Mathematics",
    semester_taken: "Spring 2024",
    review_text:
      "Great explanations and lots of practice problems. Highly recommended for anyone serious about math. Dr. Smith breaks down complex topics in an approachable way and the weekly problem sets are well designed.",
    instructor_name: "Dr. John Smith",
    overall_rating: 4.2,
    grading_rating: 4.0,
    workload_rating: 4.0,
    attendance_rating: 2.0,
    exam_difficulty_rating: 3.0,
    upvotes: 31,
    downvotes: 6,
    created_at: "2024-02-03",
  },
  {
    review_id: "r3",
    reviewer_name: "Rami Khoury",
    reviewer_email: "rami.khoury@lau.edu.lb",
    course_code: "ECON 101",
    course_title: "Principles of Microeconomics",
    university: "Lebanese American University",
    department: "Economics",
    semester_taken: "Fall 2023",
    review_text:
      "Dry material but the professor made it engaging. Exams were tricky and required deep understanding beyond memorization. Grading was harsh on partial credit.",
    instructor_name: "Dr. Lara Nassar",
    overall_rating: 2.8,
    grading_rating: 2.0,
    workload_rating: 3.0,
    attendance_rating: 4.0,
    exam_difficulty_rating: 2.0,
    upvotes: 8,
    downvotes: 14,
    created_at: "2024-03-10",
  },
];

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<
    "all" | "5" | "4" | "3" | "2" | "1"
  >("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [detailReview, setDetailReview] = useState<ReviewRow | null>(null);

  // Stable state — React Compiler can track this correctly as a useMemo dependency.
  // TO INTEGRATE: replace SEED_REVIEWS with [] and add:
  //   useEffect(() => {
  //     fetch("/api/admin/reviews")
  //       .then((r) => r.json())
  //       .then((data: ReviewRow[]) => setReviews(data))
  //       .catch(() => {/* handle error */});
  //   }, []);
  const [reviews, setReviews] = useState<ReviewRow[]>(SEED_REVIEWS);

  const universities = unique(reviews.map((r) => r.university));
  const departments = unique(
    reviews
      .filter(
        (r) => universityFilter === "all" || r.university === universityFilter,
      )
      .map((r) => r.department),
  );
  const semesters = unique(reviews.map((r) => r.semester_taken));

  const activeFilterCount = [
    ratingFilter !== "all",
    universityFilter !== "all",
    departmentFilter !== "all",
    semesterFilter !== "all",
    sortKey !== "newest",
  ].filter(Boolean).length;

  function resetFilters() {
    setRatingFilter("all");
    setUniversityFilter("all");
    setDepartmentFilter("all");
    setSemesterFilter("all");
    setSortKey("newest");
  }

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = reviews.filter((r) => {
      const matchesSearch =
        !q ||
        r.course_title.toLowerCase().includes(q) ||
        r.course_code.toLowerCase().includes(q) ||
        r.reviewer_name.toLowerCase().includes(q) ||
        r.instructor_name.toLowerCase().includes(q) ||
        r.university.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.review_text.toLowerCase().includes(q);
      return (
        matchesSearch &&
        (ratingFilter === "all" ||
          Math.floor(r.overall_rating).toString() === ratingFilter) &&
        (universityFilter === "all" || r.university === universityFilter) &&
        (departmentFilter === "all" || r.department === departmentFilter) &&
        (semesterFilter === "all" || r.semester_taken === semesterFilter)
      );
    });
    return [...result].sort((a, b) => {
      switch (sortKey) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "rating_high":
          return b.overall_rating - a.overall_rating;
        case "rating_low":
          return a.overall_rating - b.overall_rating;
        case "most_votes":
          return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
        default:
          return 0;
      }
    });
  }, [
    reviews,
    searchQuery,
    ratingFilter,
    universityFilter,
    departmentFilter,
    semesterFilter,
    sortKey,
  ]);

  // TO INTEGRATE: replace body with fetch DELETE then remove from state, e.g.:
  //   await fetch(`/api/admin/reviews/${review_id}`, { method: "DELETE" });
  //   setReviews((prev) => prev.filter((r) => r.review_id !== review_id));
  function handleDelete(review_id: string) {
    setPendingDelete(null);
    setReviews((prev) => prev.filter((r) => r.review_id !== review_id));
  }

  const closeDetail = useCallback(() => setDetailReview(null), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {detailReview && (
        <ReviewDetailModal
          review={detailReview}
          onClose={closeDetail}
          onDelete={(id) => {
            setDetailReview(null);
            handleDelete(id);
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Review Management
          </h1>
          <p className="text-sm text-gray-500">
            Moderate and manage student reviews
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-row gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course, reviewer, instructor, university..."
            className="w-full h-11 pl-10 pr-4 text-gray-900 placeholder-gray-400 rounded-md border border-gray-300 transition-colors focus:outline-none focus:border-[#6155F5] focus:ring-2 focus:ring-[#6155F5]"
          />
        </div>
        <div className="relative hidden sm:block">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-11 pl-3 pr-9 rounded-md border border-gray-300 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#6155F5] focus:ring-2 focus:ring-[#6155F5]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="rating_high">Highest rated</option>
            <option value="rating_low">Lowest rated</option>
            <option value="most_votes">Most voted</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={15}
          />
        </div>
        <button
          onClick={() => setShowFilters((p) => !p)}
          className="relative h-11 px-3 flex items-center justify-center gap-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm text-gray-700"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-[#6155F5] text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="mt-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3 items-end">
            {[
              {
                label: "Overall rating",
                value: ratingFilter,
                onChange: setRatingFilter,
                options: [
                  { value: "all", label: "All ratings" },
                  ...["5", "4", "3", "2", "1"].map((v) => ({
                    value: v,
                    label: `${v} ★`,
                  })),
                ],
              },
              {
                label: "University",
                value: universityFilter,
                onChange: (v: string) => {
                  setUniversityFilter(v);
                  setDepartmentFilter("all");
                },
                options: [
                  { value: "all", label: "All universities" },
                  ...universities.map((u) => ({ value: u, label: u })),
                ],
              },
              {
                label: "Department",
                value: departmentFilter,
                onChange: setDepartmentFilter,
                options: [
                  { value: "all", label: "All departments" },
                  ...departments.map((d) => ({ value: d, label: d })),
                ],
              },
              {
                label: "Semester",
                value: semesterFilter,
                onChange: setSemesterFilter,
                options: [
                  { value: "all", label: "All semesters" },
                  ...semesters.map((s) => ({ value: s, label: s })),
                ],
              },
            ].map(({ label, value, onChange, options }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium">
                  {label}
                </label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) =>
                      (onChange as (v: string) => void)(e.target.value)
                    }
                    className="h-9 pl-3 pr-8 rounded-md border border-gray-300 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#6155F5]"
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    size={13}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1 sm:hidden">
              <label className="text-xs text-gray-500 font-medium">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="h-9 pl-3 pr-8 rounded-md border border-gray-300 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#6155F5]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating_high">Highest rated</option>
                  <option value="rating_low">Lowest rated</option>
                  <option value="most_votes">Most voted</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={13}
                />
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="h-9 px-3 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition"
              >
                <X size={13} /> Reset
              </button>
            )}
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-400">
        {filtered.length} review{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="hidden md:block mt-2 rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 whitespace-nowrap">Course</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">
                Reviewer
              </th>
              <th className="text-left px-4 py-3 whitespace-nowrap">
                Instructor
              </th>
              <th className="text-left px-4 py-3 whitespace-nowrap">
                Semester
              </th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Review</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Overall</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Metrics</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Votes</th>
              <th className="text-left px-4 py-3 whitespace-nowrap">Date</th>
              <th className="text-right px-4 py-3 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-12 text-center text-gray-400 text-sm"
                >
                  No reviews match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.review_id}
                  onClick={() => setDetailReview(r)}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 whitespace-nowrap">
                      {r.course_code}
                    </p>
                    <p className="text-xs text-gray-500 max-w-40 truncate">
                      {r.course_title}
                    </p>
                    <p className="text-xs text-gray-400 max-w-40 truncate">
                      {r.department}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="whitespace-nowrap font-medium text-gray-800">
                      {r.reviewer_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-37.5">
                      {r.reviewer_email}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    <p className="whitespace-nowrap font-medium text-gray-800">
                      {r.instructor_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-37.5">
                      {r.university}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {r.semester_taken}
                  </td>
                  <td className="px-4 py-3 max-w-50">
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {r.review_text}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <RatingStars value={r.overall_rating} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="grid grid-cols-1 gap-1">
                      <MetricBadge
                        label="Exam"
                        value={r.exam_difficulty_rating}
                        color="bg-blue-100 text-blue-800"
                      />
                      <MetricBadge
                        label="Workload"
                        value={r.workload_rating}
                        color="bg-green-100 text-green-800"
                      />
                      <MetricBadge
                        label="Attendance"
                        value={r.attendance_rating}
                        color="bg-yellow-100 text-yellow-800"
                      />
                      <MetricBadge
                        label="Grading"
                        value={r.grading_rating}
                        color="bg-purple-100 text-purple-800"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <VoteDisplay upvotes={r.upvotes} downvotes={r.downvotes} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">
                    {r.created_at}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="flex justify-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDelete(r.review_id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden mt-2 flex flex-col gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No reviews match your search or filters.
          </p>
        ) : (
          filtered.map((r) => (
            <div
              key={r.review_id}
              onClick={() => setDetailReview(r)}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {r.course_code}
                  </h3>
                  <p className="text-sm text-gray-500">{r.course_title}</p>
                  <p className="text-xs text-gray-400">
                    {r.department} · {r.university}
                  </p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleDelete(r.review_id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="text-gray-400">Reviewer:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {r.reviewer_name}
                  </span>
                  <span className="text-gray-400 text-xs ml-1">
                    ({r.reviewer_email})
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Instructor:</span>{" "}
                  {r.instructor_name}
                </p>
                <p>
                  <span className="text-gray-400">Semester:</span>{" "}
                  {r.semester_taken}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span> {r.created_at}
                </p>
              </div>
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {r.review_text}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <RatingStars value={r.overall_rating} />
                <VoteDisplay upvotes={r.upvotes} downvotes={r.downvotes} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <MetricBadge
                  label="Exam"
                  value={r.exam_difficulty_rating}
                  color="bg-blue-100 text-blue-800"
                />
                <MetricBadge
                  label="Workload"
                  value={r.workload_rating}
                  color="bg-green-100 text-green-800"
                />
                <MetricBadge
                  label="Attendance"
                  value={r.attendance_rating}
                  color="bg-yellow-100 text-yellow-800"
                />
                <MetricBadge
                  label="Grading"
                  value={r.grading_rating}
                  color="bg-purple-100 text-purple-800"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
