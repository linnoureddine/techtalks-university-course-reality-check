"use client";

import {
  ArrowLeft,
  School,
  GraduationCap,
  Star,
  FileText,
  Briefcase,
  MapPin,
  Scale,
} from "lucide-react";
import Link from "next/link";

const course = [
  {
    slug: "cmps-204",
    code: "CMPS 204",
    title: "Animation Tools",
    university: "American University of Beirut",
    department: "Computer Science",
    credits: "3",
    level: "Undergraduate",
    language: "English",
    rating: 4.8,
    description:
      "This course teaches students the knowledge needed to create digital prototypes of 2D and 3D games. The course covers: the conceptual framework of interactive environments, game programming approaches, techniques and tools, manipulation of visual effects and sound, object animation, movement control, worlds, and interactivity. ",
    metrics: { exam: 4, workload: 4, attendance: 3, grading: 5 },
    reviewsLabel: "350+ Reviews",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function CourseInfo() {
  const data = course[0];

  return (
    <div className="max-w-5xl mx-auto py-8 pt-0">
      <Link
        href="/courses"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#6155F5]/10 px-3 py-1 text-sm font-medium text-[#6155F5]">
          {data.code}
        </span>
        <span className="text-sm text-gray-400">{data.credits} credits</span>
      </div>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
        {data.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <School className="h-4 w-4 text-[#6155F5]" />
          {data.university}
        </div>
        <div className="flex items-center gap-1">
          <GraduationCap className="h-4 w-4 text-[#6155F5]" />
          {data.department}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <StarRating rating={data.rating} />
        <span className="font-semibold text-gray-900">{data.rating}/5</span>
        <span className="text-sm text-gray-400">({data.reviewsLabel})</span>
      </div>

      <div className="my-6 h-px w-full bg-gray-200" />
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Course Description
        </h2>
        <p className="mt-2 text-medium text-justify leading-relaxed text-gray-600">
          {data.description}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-400">Level</div>
          <div className="mt-1 font-medium text-gray-900">{data.level}</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-400">Language</div>
          <div className="mt-1 font-medium text-gray-900">{data.language}</div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Course Ratings</h2>

        <div className="m-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Exam Difficulty</span>
              <FileText className="h-5 w-5 text-[#6155F5]" />
            </div>
            <div className="text-center">
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.metrics.exam}.0
              </p>
              <p className="text-[12px]">out of 5</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Workload</span>
              <Briefcase className="h-5 w-5 text-[#6155F5]" />
            </div>
            <div className="text-center">
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.metrics.workload}.0
              </p>
              <p className="text-[12px]">out of 5</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                Attendance Strictness
              </span>
              <MapPin className="h-5 w-5 text-[#6155F5]" />
            </div>
            <div className="text-center">
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.metrics.attendance}.0
              </p>
              <p className="text-[12px]">out of 5</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Grading Fairness</span>
              <Scale className="h-5 w-5 text-[#6155F5]" />
            </div>
            <div className="text-center">
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {data.metrics.grading}.0
              </p>
              <p className="text-[12px]">out of 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
