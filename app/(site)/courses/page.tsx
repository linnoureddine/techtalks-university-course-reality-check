"use client";

import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { filterCourses } from "@/lib/filterCourses";
import { Filters } from "@/types/filters";
import FiltersPanel from "@/components/FiltersPanel";
import CourseCard from "@/components/CourseCard";

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
      "This course introduces the skills, concepts, and capabilities needed for effective use of information technology...",
    metrics: { exam: 3, workload: 4, attendance: 4, grading: 4 },
    reviewsLabel: "200+ Reviews",
  },
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  const [filters, setFilters] = useState<Filters>({
    university: "",
    department: "",
    language: "",
    level: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.replace(`/courses?${params.toString()}`);
  }, [query, filters, router]);

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, { ...filters, query });
  }, [filters, query]);

  const isSearching = !!query;

  return (
    <main className="min-h-screen bg-white px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          {isSearching ? `Search Results for "${query}"` : "Browse Courses"}
        </h1>
        <p className="mt-2 text-gray-500 max-w-xl">
          Explore and filter courses by university, department, language, and
          level.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses, codes, universities..."
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5
                        focus:outline-none focus:ring-2 focus:ring-[#6155F5]
                        focus:border-transparent transition"
            />
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center rounded-xl border border-gray-300
                        p-2.5 hover:bg-gray-50 transition"
          >
            <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              key="filters"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden mb-6 mt-6"
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

        <div className="flex flex-col gap-6 mt-8">
          {filteredCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No courses match your search or filters.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
