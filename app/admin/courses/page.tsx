"use client";

import { useState } from "react";
import AddCourseCard from "@/components/admin/AddCourseCard";
import Button from "@/components/Button";
import { Pencil, Trash2, Plus } from "lucide-react";

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
};

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);

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
    },
  ]);

  function handleSaveCourse(course: Course) {
    setCourses((prev) => [...prev, course]);
  }

  function handleDelete(slug: string) {
    alert(`Delete ${slug}`);
  }

  function handleEdit(slug: string) {
    alert(`Edit ${slug}`);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Course Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage courses and academic data
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Course
        </Button>
      </div>

      {showForm && (
        <AddCourseCard
          onClose={() => setShowForm(false)}
          onSave={handleSaveCourse}
        />
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
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
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
                    Attendence:{course.metrics.attendance}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">
                    Grading:{course.metrics.grading}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-2 truncate text-gray-500">
                  {course.description}
                </td>
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

      <div className="md:hidden mt-6 space-y-4">
        {courses.map((course) => (
          <div
            key={course.slug}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{course.code}</h3>
                <p className="text-sm text-gray-500">{course.title}</p>
              </div>

              <div className="flex gap-3 text-gray-400">
                <button
                  onClick={() => handleEdit(course.slug)}
                  className="hover:text-blue-500"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(course.slug)}
                  className="hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <strong>University:</strong> {course.university}
              </p>
              <p>
                <strong>Department:</strong> {course.department}
              </p>
              <p>
                <strong>Level:</strong> {course.level}
              </p>
              <p>
                <strong>Language:</strong> {course.language}
              </p>
              <p>
                <strong>Credits:</strong> {course.credits}
              </p>
              <p>
                <strong>Rating:</strong> {course.rating}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                  Exam:{course.metrics.exam}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                  Workload:{course.metrics.workload}
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
                  Attendence:{course.metrics.attendance}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">
                  Grading:{course.metrics.grading}
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-500">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
