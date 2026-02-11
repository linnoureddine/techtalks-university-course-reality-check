"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import { useToast } from "./toast/Toastprovider";


export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const { toast } = useToast();

  function handleSubmit() {
    if (!feedback.trim()) {
      toast("Please write some feedback before submitting.", "error");
      return;
    }
    if (rating === 0) {
      toast("Please select a rating.", "error");
      return;
    }

    console.log({ rating, feedback });

    toast("Thanks! Your feedback was submitted.", "success");
    onClose();
  }

  const isDisabled = !feedback.trim() || rating === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
          aria-label="Close"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Help us improve Coursality!
        </h2>

        <div className="mt-2">
          <StarRating value={rating} onChange={setRating} />
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write feedback..."
          className="mt-4 h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <div className="mt-4 flex justify-end">
          {/* same Button, but block click when disabled */}
          <div
            className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            onClick={() => {
              if (!isDisabled) handleSubmit();
            }}
          >
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
