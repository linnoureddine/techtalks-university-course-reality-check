"use client";

import { useState } from "react";
import Button from "@/components/Button";
import StarRating from "@/components/StarRating";
import SliderRow from "@/components/SliderRow";

type WriteReviewCardProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

export default function WriteReviewCard({
  onSubmit,
  onCancel,
}: WriteReviewCardProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [instructor, setInstructor] = useState("");
  const [semester, setSemester] = useState("");
  const [examDifficulty, setExamDifficulty] = useState(3);
  const [attendanceStrictness, setAttendanceStrictness] = useState(3);
  const [workload, setWorkload] = useState(3);
  const [gradingFairness, setGradingFairness] = useState(3);
  const [review, setReview] = useState("");

  const canSubmit =
    overallRating > 0 &&
    instructor.trim() &&
    semester.trim() &&
    review.trim();

  function resetForm() {
    setOverallRating(0);
    setInstructor("");
    setSemester("");
    setExamDifficulty(3);
    setAttendanceStrictness(3);
    setWorkload(3);
    setGradingFairness(3);
    setReview("");
  }

  function handleSubmit() {
    if (!canSubmit) return;

    const payload = {
      overallRating,
      instructor: instructor.trim(),
      semester: semester.trim(),
      examDifficulty,
      attendanceStrictness,
      workload,
      gradingFairness,
      review: review.trim(),
    };

    console.log(payload);

    resetForm();
    onSubmit();
  }

  function handleCancel() {
    resetForm();
    onCancel();
  }

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">
        Leave Your Review
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            Overall Rating
          </div>
          <StarRating value={overallRating} onChange={setOverallRating} />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            Instructor’s Name
          </div>
          <input
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#6155F5]/30"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            Semester Taken
          </div>
          <input
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#6155F5]/30"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SliderRow
          label="Exam Difficulty (1-5)"
          value={examDifficulty}
          onChange={setExamDifficulty}
          leftLabel="Easy"
          rightLabel="Very Hard"
        />
        <SliderRow
          label="Attendance Strictness (1-5)"
          value={attendanceStrictness}
          onChange={setAttendanceStrictness}
          leftLabel="Relaxed"
          rightLabel="Very Strict"
        />
        <SliderRow
          label="Workload (1-5)"
          value={workload}
          onChange={setWorkload}
          leftLabel="Light"
          rightLabel="Very Heavy"
        />
        <SliderRow
          label="Grading Fairness (1-5)"
          value={gradingFairness}
          onChange={setGradingFairness}
          leftLabel="Unfair"
          rightLabel="Very Fair"
        />
      </div>

      <div className="mt-6 space-y-2">
        <div className="text-sm font-medium text-gray-700">
          Your Review
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this course..."
          className="w-full min-h-[140px] resize-none rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#6155F5]/30"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="elevated"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={!canSubmit ? "opacity-50 cursor-not-allowed" : ""}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}
