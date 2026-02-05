import Button from "@/components/Button";

export default function AboutPage() {
  return (
    <main className="bg-[#F2F2F7]">
      <section className="py-20 px-6 mt-10 sm:mt-12 lg:mt-18">
        <div className="max-w-4xl mx-auto text-center ">
          <h1 className="text-4xl text-[#111827] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Making Course Selection{" "}
            <span className="bg-gradient-to-r from-[#6155F5] to-teal-500 bg-clip-text text-transparent">
              Transparent
            </span>
            {""}
          </h1>

          <p className="text-l sm:text-l md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            We believe every student deserves honest insights into their courses
            before committing. Coursality brings transparency to higher
            education through authentic peer reviews.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10 mt-0">
        <div className="bg-white rounded-xl p-8 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-7">
            Official university course descriptions often paint an incomplete
            picture of what students will actually experience. They tell you the
            topics covered, but not the reality of the workload, the fairness of
            grading, or how strict attendance policies really are.
            <br />
            <br />
            Course Compass bridges this gap by allowing students to anonymously
            share honest course experiences, helping others make informed
            decisions instead of relying on incomplete information.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            The Problem We Are Solving
          </h2>

          <p className="text-gray-700 mb-4 leading-7">
            <strong>Students struggle with course selection.</strong> University
            course catalogs provide descriptions, prerequisites, and credit
            hours, but often miss the questions that matter most:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
            <li>How difficult are the exams really?</li>
            <li>What’s the actual time commitment outside class?</li>
            <li>Is grading fair and transparent?</li>
            <li>How strict is attendance enforcement?</li>
            <li>What tips do past students have for success?</li>
          </ul>

          <p className="text-gray-700 leading-7">
            Without these insights, students often end up in courses that don’t
            match their expectations, leading to unnecessary stress, poor
            grades, or wasted time.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Our Approach</h2>

          <p className="text-gray-700 mb-4 leading-7">
            Course Compass provides a platform where students can:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-7">
            <li>
              <strong>Browse courses</strong> across universities and
              departments
            </li>
            <li>
              <strong>Read anonymous reviews</strong> from past students
            </li>
            <li>
              <strong>Compare ratings</strong> for workload, exams, grading, and
              attendance
            </li>
            <li>
              <strong>Learn practical tips</strong> from real experiences
            </li>
            <li>
              <strong>Share insights</strong> to help future students
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Anonymity */}
          <div className="bg-white rounded-xl p-6 transition-shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Anonymity & Privacy</h3>
            <p className="text-gray-700 leading-7">
              All reviews are completely anonymous. Students can share honest
              feedback without fear of repercussions, ensuring authentic and
              trustworthy insights.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 transition-shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Community-Driven</h3>
            <p className="text-gray-700 leading-7">
              Course Compass grows through student contributions. The more
              experiences shared, the more valuable the platform becomes for
              everyone.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-7">
            We envision a future where every student has access to transparent,
            honest course information before enrolling. By democratizing course
            insights, we aim to reduce academic stress and help students build
            schedules that truly fit their goals.
          </p>
        </div>

        <div className="text-center pt-10">
          <h2 className="text-3xl font-bold mb-2">
            Start Making Better Course Decisions
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of students who use Coursality to navigate their
            academic journey with confidence.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="h-13">Browse Courses</Button>
            <Button className="h-13" variant="elevated">
              Share your experience
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
