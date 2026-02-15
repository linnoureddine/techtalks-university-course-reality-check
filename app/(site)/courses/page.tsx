"use client";

import { useState, useMemo } from "react";
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
      "This course introduces the skills, concepts, and capabilities needed for effective use of information technology (IT). It includes logical reasoning, organization of information, managing complexity, operations of computers and networks, digital representation of information, security principles, and the use of contemporary applications such as effective Web search, spreadsheets, and database systems. Also it includes a basic introduction to programming and problem solving through scripting web applications.",
    metrics: { exam: 3, workload: 4, attendance: 4, grading: 4 },
    reviewsLabel: "200+ Reviews",
  },
];

export default function CoursesPage() {
  const [filters, setFilters] = useState<Filters>({
    university: "",
    department: "",
    language: "",
    level: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const query = ""; // or get from URL search params

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, { ...filters, query });
  }, [filters, query]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-6 py-10">
      <div className="max-w-6xl mx-auto py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="mt-2 text-gray-500 max-w-xl">
            Explore and filter courses by university, department, language, and
            level.
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg p-2 hover:bg-gray-50 transition"
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

      {showFilters && (
        <div className="max-w-6xl mx-auto px-6">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            onApply={() => setShowFilters(false)}
            onReset={() => setShowFilters(false)}
          />
        </div>
      )}

      <div className="max-w-7xl md:max-w-6xl mx-auto md:px-6 mt-6 flex flex-col gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}

        {filteredCourses.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No courses match your filters.
          </p>
        )}
      </div>
    </main>
  );
}
