export default function Hero() {
  return (
    <section className="bg-linear-to-br from-gray-50 via-white to-purple-50/20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The <span className="text-[#6155F5]">Real Truth</span> About University Courses
          </h1>

          <p className="text-l sm:text-l md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Official descriptions lie. Get unfiltered reviews on workload, grading
            fairness, exam difficulty, and what professors won&apos;t tell you.
          </p>

          <form action="" className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-xl mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for a course, university, department..."
                  className="w-full pl-10 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none rounded-md border border-gray-300"
                />
              </div>
              <button
                type="submit"
                className="bg-[#6155F5] text-white text-lg px-6 py-2.5 rounded-md hover:bg-[#503fdc] transition flex items-center "
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
