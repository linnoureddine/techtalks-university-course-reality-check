import StarRating from "@/components/StarRating";
import ReviewFooterBar from "@/components/ReviewFooterBar";

import { FileText, Briefcase, MapPin, Scale } from "lucide-react";

export default function StudentReviews() {
  return (
    <section className="mt-10">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Student Reviews{" "}
          <span className="text-gray-500 font-normal">(2)</span>
        </h2>

        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6155F5]">
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
      </div>

      {/* reviews */}
      <div className="space-y-4">
        <div className="rounded-xl bg-white p-7 shadow-sm border border-gray-100">
          {/* top row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Student352372
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Taken Fall 2023 · Instructor: Dr. Lama Affara
              </p>
            </div>

            {/* stars */}
            <StarRating value={5} />
          </div>

          {/* review text */}
          <p className="mt-4 text-gray-700 leading-7 text-[15px]">
            The Animation Tools course was manageable in terms of difficulty and
            well-structured for beginners. The material was explained clearly,
            and the assignments helped reinforce what we learned...
          </p>

          {/* ratings row */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white px-6 py-4">
            <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
              <div className="flex items-center gap-3 text-gray-600">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-base">Exam: 4/5</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <span className="text-base">Workload: 4/5</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-base">Attendance: 3/5</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Scale className="h-5 w-5 text-gray-400" />
                <span className="text-base">Grading: 5/5</span>
              </div>
            </div>
          </div>

          {/* footer bar */}
          <ReviewFooterBar initialVotes={24} timeAgo="2 weeks ago" />
        </div>
      </div>
    </section>
  );
}
