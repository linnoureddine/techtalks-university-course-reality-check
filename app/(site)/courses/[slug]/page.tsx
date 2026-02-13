"use client";

import { useState } from "react";

import CourseInfo from "@/components/CourseInfo";
import Button from "@/components/Button";
import WriteReviewCard from "@/components/WriteReviewCard";
import StudentReviews from "@/components/StudentReviews";

export default function Page() {
  const [showWriteReview, setShowWriteReview] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-6 py-10">
      <section className="mx-auto max-w-5xl">
        <CourseInfo />
        <div>
          {!showWriteReview && (
            <Button onClick={() => setShowWriteReview(true)} variant="primary">
              Leave a review
            </Button>
          )}
          {showWriteReview && (
            <WriteReviewCard onSubmit={() => setShowWriteReview(false)} />
          )}
        </div>
        <StudentReviews />
      </section>
    </main>
  );
}
