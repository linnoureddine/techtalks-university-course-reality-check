"use client";

<<<<<<< HEAD
import { useState } from "react";
=======
import { useRef, useState } from "react";
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
import FeedbackModal from "./FeedbackModal";
import Button from "./Button";

type Feedback = {
  quote: string;
  user: string;
};

const FEEDBACKS: Feedback[] = [
  {
    quote:
      "This platform helped me avoid choosing the wrong course. The student reviews were honest and super helpful.",
    user: "student2189",
  },
  {
    quote:
      "This platform helped me avoid choosing the wrong course. The student reviews were honest and super helpful.",
    user: "student2189",
  },
  {
    quote:
      "This platform helped me avoid choosing the wrong course. The student reviews were honest and super helpful.",
    user: "student2189",
  },
  {
    quote:
      "This platform helped me avoid choosing the wrong course. The student reviews were honest and super helpful.",
    user: "student2189",
  },
  {
    quote:
      "This platform helped me avoid choosing the wrong course. The student reviews were honest and super helpful.",
    user: "student2189",
  },
];

function QuoteCard({ quote, user }: Feedback) {
  return (
<<<<<<< HEAD
    <div className="w-[190px] rounded-xl bg-white px-5 py-5 shadow-sm border border-gray-100">
=======
    <div
      className="
        w-[230px] rounded-xl bg-white px-6 py-6
        border border-gray-100
        transition-all duration-300 ease-out
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]
        hover:-translate-y-1
      "
    >
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
      <p className="text-[13px] font-bold text-gray-900 leading-snug">
        “{quote}”
      </p>
      <p className="mt-3 text-[11px] text-gray-400">{user}</p>
    </div>
  );
}

export default function FeedbackCarousel() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

<<<<<<< HEAD
=======
  const rowRef = useRef<HTMLDivElement | null>(null);

  function slideLeft() {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: -220, behavior: "smooth" });
  }

  function slideRight() {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: 220, behavior: "smooth" });
  }

>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          What Our Users Think
        </h2>

<<<<<<< HEAD
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {FEEDBACKS.map((f, idx) => (
            <QuoteCard key={idx} quote={f.quote} user={f.user} />
          ))}
=======
        <div className="relative mt-8">
            <button
            type="button"
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            ref={rowRef}
            className="flex gap-6 overflow-x-auto flex-nowrap px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {FEEDBACKS.map((f, idx) => (
              <div key={idx} className="shrink-0">
                <QuoteCard quote={f.quote} user={f.user} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            aria-label="Next"
          >
            ›
          </button>
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={() => setFeedbackOpen(true)}>
            Leave Your Feedback
          </Button>
        </div>
      </div>

      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
    </section>
  );
}
<<<<<<< HEAD
=======
// carousel tweak update 
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
