"use client";

import { useState } from "react";
import Stats from "./Stats";
import Searchbar from "./Searchbar";

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <div
      className="max-w-4xl mx-auto px-6 sm:px-8
      pt-20 sm:pt-20 lg:pt-32
      pb-10 sm:pb-12 lg:pb-12"
    >
      <div className="text-center">
        <h1 className="text-5xl sm:text-4xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-6">
          The{" "}
          <span className="bg-gradient-to-r from-[#6155F5] to-teal-500 bg-clip-text text-transparent">
            Real Truth
          </span>{" "}
          About University Courses
        </h1>

        <p className="text-l sm:text-l md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Official descriptions lie. Get unfiltered reviews on workload, grading
          fairness, exam difficulty, and what professors won&apos;t tell you.
        </p>

        <Searchbar query={query} setQuery={setQuery} />
      </div>

      <Stats />
    </div>
  );
}
