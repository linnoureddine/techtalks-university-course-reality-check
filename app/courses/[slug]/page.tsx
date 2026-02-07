import WriteReviewCard from "@/components/WriteReviewCard";

function StudentReviews() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Student Reviews{" "}
          <span className="text-gray-500 font-normal">(324)</span>
        </h2>

        <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Student352372</h3>
              <p className="text-sm text-gray-500">
                Taken Fall 2023 · Instructor: Dr. Lama Affara
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-900">5 ★★★★★</div>
          </div>

          <p className="mt-4 text-gray-700 leading-7">
            The Animation Tools course was manageable in terms of difficulty and
            well-structured for beginners...
          </p>

          <div className="mt-5 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 md:grid-cols-4">
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Exam:</span>
                <span className="font-medium">4/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Workload:</span>
                <span className="font-medium">4/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Attendance:</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-2">
                <span className="text-gray-500">Grading:</span>
                <span className="font-medium">5/5</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">2 weeks ago</div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <WriteReviewCard />
        <StudentReviews />
      </section>
    </main>
  );
}
