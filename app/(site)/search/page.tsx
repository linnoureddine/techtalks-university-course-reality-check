"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "@/components/Searchbar";
import CourseCard from "@/components/CourseCard";
import FiltersPanel from "@/components/FiltersPanel";
import { Filters } from "@/types/filters";
import { filterCourses } from "@/lib/filterCourses";

const courses = [
  {
    slug: "cmps-204",
    code: "CMPS 204",
    title: "Animation Tools",
    university: "American University of Beirut",
    department: "Computer Science",
    credits: "3 cr.",
    level: "Undergraduate",
    language: "English",
    rating: 4.8,
    description:
      "This course teaches students the knowledge needed to create digital prototypes of 2D and 3D games...",
    metrics: { exam: 4, workload: 4, attendance: 3, grading: 5 },
    reviewsLabel: "350+ Reviews",
  },
  {
    slug: "cmps-101",
    code: "CMPS 101",
    title: "Introduction to Computer Science",
    university: "American University of Beirut",
    department: "Computer Science",
    credits: "3 cr.",
    level: "Undergraduate",
    language: "English",
    rating: 4.2,
    description:
      "This course introduces the skills, concepts, and capabilities needed for effective use of information technology (IT)...",
    metrics: { exam: 3, workload: 4, attendance: 4, grading: 4 },
    reviewsLabel: "200+ Reviews",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    university: "",
    department: "",
    language: "",
    level: "",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.replace(`/search?${params.toString()}`);
  }, [query, filters, router]);

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, { ...filters, query });
  }, [query, filters]);

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <Searchbar query={query} setQuery={setQuery} />
          </div>

          <button
            className="flex items-center justify-center rounded-xl border border-gray-300 
                        p-2.5 hover:bg-gray-50 transition"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17V12.414L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              key="filters"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden mb-6"
            >
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                onApply={() => setShowFilters(false)}
                onReset={() => setShowFilters(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCourses.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            No courses found.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
