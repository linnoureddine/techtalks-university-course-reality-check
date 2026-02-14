"use client";

import { Trash2 } from "lucide-react";

type Review = {
  id: number;
  course: string;
  professor: string;
  content: string;
  upvotes: number;
  date: string;
};

export default function AdminReviewsPage() {
  const reviews: Review[] = [
    {
      id: 1,
      course: "Data Structure and Algorithms",
      professor: "Dr. Sarah Mitchell",
      content:
        "This course was tough but rewarding. Dr. Mitchell is passionate about the subject and genuinely wants students to succeed.",
      upvotes: 47,
      date: "1/15/2024",
    },
    {
      id: 2,
      course: "Data Structure and Algorithms",
      professor: "Dr. Sarah Mitchell",
      content:
        "This course was tough but rewarding. Dr. Mitchell is passionate about the subject and genuinely wants students to succeed.",
      upvotes: 47,
      date: "1/15/2024",
    },
  ];

  function handleDelete(id: number) {
    alert(`Delete review ${id}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">
        Admin Dashboard
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Manage platform content and monitor activity
      </p>

      <h2 className="mt-6 text-lg font-semibold text-black">
        Review Management
      </h2>

      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-white p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  {review.course}
                </h3>
                <p className="text-sm text-gray-400">
                  {review.professor}
                </p>
              </div>

              <button
                onClick={() => handleDelete(review.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              {review.content}
            </p>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>{review.upvotes} upvotes</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
