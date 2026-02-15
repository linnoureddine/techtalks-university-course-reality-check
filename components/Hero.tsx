<<<<<<< HEAD
import Stats from "./Stats";
import Button from "./Button";

export default function Hero() {
=======
"use client";

import { useState } from "react";
import Stats from "./Stats";
import Searchbar from "./Searchbar";

export default function Hero() {
  const [query, setQuery] = useState("");

>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
  return (
    <div
      className="max-w-4xl mx-auto px-6 sm:px-8
      pt-20 sm:pt-20 lg:pt-32
<<<<<<< HEAD
      pb-10 sm:pb-12 lg:pb-16"
=======
      pb-10 sm:pb-12 lg:pb-12"
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
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

<<<<<<< HEAD
        <form
          action=""
          className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-xl mx-auto"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search for a course, university, department..."
                className="w-full h-11 pl-10 pr-4 text-gray-900 placeholder-gray-400
                rounded-md border border-gray-300 transition-colors
                focus:outline-none focus:border-[#6155F5] focus:ring-2 focus:ring-[#6155F5]"
              />
            </div>
            <Button className="h-11 text-xlg hidden sm:inline-flex">
              Search
            </Button>
          </div>
        </form>
      </div>
=======
        <Searchbar query={query} setQuery={setQuery} />
      </div>

>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
      <Stats />
    </div>
  );
}
