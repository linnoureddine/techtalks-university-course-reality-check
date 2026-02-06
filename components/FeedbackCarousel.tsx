"use client";

import { useState } from "react";
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
    <div className="w-[190px] rounded-xl bg-white px-5 py-5 shadow-sm border border-gray-100">
      <p className="text-[13px] font-bold text-gray-900 leading-snug">
        “{quote}”
      </p>
      <p className="mt-3 text-[11px] text-gray-400">{user}</p>
    </div>
  );
}

export default function FeedbackCarousel() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          What Our Users Think
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {FEEDBACKS.map((f, idx) => (
            <QuoteCard key={idx} quote={f.quote} user={f.user} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={() => setFeedbackOpen(true)}>
            Leave Your Feedback
            </Button>
        </div>
      </div>

      {feedbackOpen && (
        <FeedbackModal onClose={() => setFeedbackOpen(false)} />
      )}
    </section>
  );
}
