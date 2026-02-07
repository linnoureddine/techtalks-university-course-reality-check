export default function CoursePage() {
  return (
    <main className="bg-[#F2F2F7] min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* course details فوق */}
        
        <StudentReviews />
      </div>
    </main>
  );
}

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

      <div className="space-y-5">
        <ReviewCard />
        <ReviewCard />
      </div>
    </section>
  );
}

function ReviewCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">Student352372</h3>
          <p className="text-sm text-gray-500">
            Taken Fall 2023 · Instructor: Dr. Lama Affara
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-yellow-500">★★★★★</div>
          <span className="text-sm font-semibold text-gray-700">5</span>
        </div>
      </div>

      <p className="mt-4 text-gray-700 leading-7 text-sm">
        The animation tools course was manageable in terms of difficulty and well-structured
        for beginners. The material was explained clearly, and the assignments helped reinforce
        what we learned. Exams were fair and mostly based on practical understanding rather than memorization.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-600">
        <div>Exam: 4/5</div>
        <div>Workload: 4/5</div>
        <div>Attendance: 3/5</div>
        <div>Grading: 5/5</div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
        <span>👍 24</span>
        <span>2 weeks ago</span>
      </div>
    </div>
  );
}
