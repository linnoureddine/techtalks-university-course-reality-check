"use client";

import { useSearchParams } from "next/navigation";
import CourseCard from "components/CourseCard";
import { filterCourses } from "lib/filterCourses";
// import { courses } from "@/data/courses";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const results = filterCourses(course, { query });

  return (
    <main className="min-h-screen px-4 md:px-10 py-8">
      <h1 className="text-2xl font-semibold mb-2">Search results</h1>

      {query && (
        <p className="text-sm text-gray-600 mb-6">
          Results for <span className="font-medium">"{query}"</span>
        </p>
      )}

      {results.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">No courses found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </main>
  );
}
