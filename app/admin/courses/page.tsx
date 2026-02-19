"use client";

import { useState, useMemo } from "react";
import AddCourseCard from "@/components/admin/AddCourseCard";
import Button from "@/components/Button";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import FiltersPanel from "@/components/FiltersPanel";
import { Filters } from "@/types/filters";

type Course = {
  slug: string;
  code: string;
  title: string;
  university: string;
  department: string;
  credits: string;
  level: string;
  language: string;
  rating: number;
  description: string;
  metrics: {
    exam: number;
    workload: number;
    attendance: number;
    grading: number;
  };
  numberOfReviews?: number;
};

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    university: "",
    department: "",
    language: "",
    level: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState<Course[]>([
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
        "This course introduces the skills, concepts, and capabilities needed for effective use of information technology.",
      metrics: { exam: 4, workload: 4, attendance: 3, grading: 5 },
      numberOfReviews: 120,
    },
  ]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.university.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!filters.department || course.department === filters.department) &&
        (!filters.level || course.level === filters.level) &&
        (!filters.university || course.university === filters.university) &&
        (!filters.language || course.language === filters.language);

      return matchesSearch && matchesFilters;
    });
  }, [courses, searchQuery, filters]);

  type NewCourseInput = Omit<Course, "metrics"> & {
  metrics?: Course["metrics"];
};

function handleSaveCourse(course: NewCourseInput) {
  const normalized: Course = {
    ...course,
    metrics: course.metrics ?? { exam: 0, workload: 0, attendance: 0, grading: 0 },
  };

  setCourses((prev) => [...prev, normalized]);
}


  function handleDelete(slug: string) {
    alert(`Delete ${slug}`);
  }

  function handleEdit(slug: string) {
    alert(`Edit ${slug}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Course Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage courses and academic data
          </p>
        </div>

        <div className="flex justify-center sm:justify-start items-center">
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add Course
          </Button>
        </div>
      </div>

      {showForm && (
        <AddCourseCard
          onClose={() => setShowForm(false)}
          onSave={handleSaveCourse}
        />
      )}

      <div className="mt-4 flex flex-row gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a course, university, department..."
            className="w-full h-11 pl-10 pr-4 text-gray-900 placeholder-gray-400
                  rounded-md border border-gray-300 transition-colors
                  focus:outline-none focus:border-[#6155F5]
                  focus:ring-2 focus:ring-[#6155F5]"
          />
        </div>

        <button
          className="h-11 px-3 flex items-center justify-center rounded-md
                    border border-gray-300 hover:bg-gray-50 transition"
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
        <div className="mt-4">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            onApply={() => setShowFilters(false)}
            onReset={() => setShowFilters(false)}
          />
        </div>
      )}

      <div className="hidden md:block mt-6 rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">Code</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">University</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Level</th>
              <th className="text-left px-4 py-3">Language</th>
              <th className="text-left px-4 py-3">Credits</th>
              <th className="text-left px-4 py-3">Rating</th>
              <th className="text-left px-4 py-3">Metrics</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Reviews</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr
                key={course.slug}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{course.code}</td>
                <td className="px-4 py-3">{course.title}</td>
                <td className="px-4 py-3">{course.university}</td>
                <td className="px-4 py-3">{course.department}</td>
                <td className="px-4 py-3">{course.level}</td>
                <td className="px-4 py-3">{course.language}</td>
                <td className="px-4 py-3">{course.credits}</td>
                <td className="px-4 py-3">{course.rating}</td>
                <td className="px-4 py-3 grid col-1 gap-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                    Exam:{course.metrics.exam}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                    Workload:{course.metrics.workload}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                    Attendance:{course.metrics.attendance}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">
                    Grading:{course.metrics.grading}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-2 truncate text-gray-500">
                  {course.description}
                </td>
                <td className="px-4 py-3">{course.numberOfReviews}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3 text-gray-400">
                    <button
                      onClick={() => handleEdit(course.slug)}
                      className="hover:text-blue-500"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(course.slug)}
                      className="hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden mt-6 flex flex-col gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.slug}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{course.code}</h3>
                <p className="text-sm text-gray-500">{course.title}</p>
              </div>

              <div className="flex gap-3 text-gray-400">
                <button
                  onClick={() => handleEdit(course.slug)}
                  className="hover:text-blue-500"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(course.slug)}
                  className="hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <span className="text-gray-400">University:</span>{" "}
                {course.university}
              </p>
              <p>
                <span className="text-gray-400">Department:</span>{" "}
                {course.department}
              </p>
              <p>
                <span className="text-gray-400">Level:</span> {course.level}
              </p>
              <p>
                <span className="text-gray-400">Language:</span>{" "}
                {course.language}
              </p>
              <p>
                <span className="text-gray-400">Credits:</span> {course.credits}
              </p>
              <p>
                <span className="text-gray-400">Rating:</span> {course.rating}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                Exam: {course.metrics.exam}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                Workload: {course.metrics.workload}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                Attendance: {course.metrics.attendance}
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">
                Grading: {course.metrics.grading}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500 line-clamp-2">
              {course.description}
            </p>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <p className="text-gray-500 text-center">No courses found.</p>
        )}
      </div>
    </div>
  );
}
