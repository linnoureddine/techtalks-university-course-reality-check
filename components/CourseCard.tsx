"use client";
import Link from "next/link";
import React from "react";
import { FileText, Briefcase, MapPin, Scale, User } from "lucide-react";

type CourseMetrics = {
  exam: number;
  workload: number;
  attendance: number;
  grading: number;
};

type CourseCardProps = {
  code: string;
  title: string;
  university: string;
  department: string;
  credits: string;
  level: string;
  language: string;
  rating: number;
  description: string;
  metrics: CourseMetrics;
  reviewsLabel: string;
  className?: string;
};

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.27l5.18 3.05-1.39-5.93 4.61-4-6.07-.52L12 4.5 9.67 9.87l-6.07.52 4.61 4-1.39 5.93L12 17.27z" />
    </svg>
  );
}

export default function CourseCard({
  code,
  title,
  university,
  department,
  credits,
  level,
  language,
  rating,
  description,
  metrics,
  reviewsLabel,
  className = "",
}: CourseCardProps) {
  const slug = code.trim().replace(/\s+/g, "-");

  return (
    <Link href={`/courses/${slug}`} className="block w-full">
      <div
        className={`w-full max-w-6xl min-h-[250px] rounded-2xl bg-white p-5
      shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      cursor-pointer transition-transform hover:scale-[1.01]
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
      ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[20px] font-semibold tracking-tight text-[#111827]">
              <span className="text-[#6155F5]">{code}</span> {title}
            </h3>
            <p className="mt-1 text-[15px] text-gray-400">
              {university} · {department} · {credits}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[20px] font-semibold text-[#111827]">
              {rating.toFixed(1)}
            </span>
            <StarIcon className="h-6 w-6 text-[#F5C542]" />
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-[13px] font-medium text-[#6155F5] bg-[#EEF2FF] px-2 py-1 rounded-full">
            {level}
          </span>
          <span className="text-[13px] font-medium text-[#10B981] bg-[#D1FAE5] px-2 py-1 rounded-full">
            {language}
          </span>
        </div>

        <p className="mt-3 text-[15px] leading-relaxed text-gray-800 line-clamp-4">
          {description}
        </p>
        <div className="mt-4 rounded-xl border border-gray-300 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex justify-between">
              <FileText className="h-5 w-5 text-[#6155F5]" />
              <span className="text-[15px] text-gray-500">
                Exam: {metrics.exam}/5
              </span>
            </div>

            <div className="flex justify-between">
              <Briefcase className="h-5 w-5 text-[#6155F5]" />
              <span className="text-[15px] text-gray-500">
                Workload: {metrics.workload}/5
              </span>
            </div>

            <div className="flex justify-between">
              <MapPin className="h-5 w-5 text-[#6155F5]" />
              <span className="text-[15px] text-gray-500">
                Attendance: {metrics.attendance}/5
              </span>
            </div>

            <div className="flex justify-between">
              <Scale className="h-5 w-5 text-[#6155F5]" />
              <span className="text-[15px] text-gray-500">
                Grading: {metrics.grading}/5
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-gray-400">
          <User className="h-6 w-6" />
          <span className="text-[15px] font-medium">{reviewsLabel}</span>
        </div>
      </div>
    </Link>
  );
}
