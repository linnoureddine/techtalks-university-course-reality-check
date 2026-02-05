"use client";

import Button from "@/components/Button";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";

const statsData = {
  reviews: 50000,
  students: 15000,
  universities: 200,
  rating: 4.3,
};

export default function AboutPage() {
  return (
    <main className="bg-[#FFFFFF]">
      <section className="py-20 px-6 pt-40">
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

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6 mt-0">
        <div className="rounded-xl p-6 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-gray-700 leading-7">
            At Coursality, our mission is to make course selection transparent
            and stress-free. We provide honest, unfiltered student reviews so
            you can make informed decisions about workload, grading, and
            teaching quality — no surprises, no guesswork.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 transition-shadow hover:shadow-lg">
            <div className="flex gap-4 items-center">
              <TrustIcon className="h-8 w-8 text-[#6155F5] mb-3 inline-block" />
              <h3 className="text-lg font-semibold mb-3">
                Anonymity & Privacy
              </h3>
            </div>
            <p className="text-gray-700 leading-7">
              All reviews are completely anonymous. Students can share honest
              feedback without fear of repercussions, ensuring authentic and
              trustworthy insights.
            </p>
          </div>

          <div className="rounded-xl p-6 transition-shadow hover:shadow-lg">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-people h-8 w-8 
                text-[#6155F5] 
                mb-3 inline-block"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
              </svg>
              <h3 className="text-lg font-semibold mb-3">Community-Driven</h3>
            </div>
            <p className="text-gray-700 leading-7">
              Coursality grows through student contributions. The more
              experiences shared, the more valuable the platform becomes for
              everyone.
            </p>
          </div>
        </div>

        <HowItWorks />

        {/* <div className="rounded-xl p-8 transition-shadow hover:shadow-lg">
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
        </div> */}

        <div className="rounded-xl p-8 transition-shadow hover:shadow-lg">
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
        {/* <div className="bg-white rounded-xl p-8 transition-shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-7">
            We envision a future where every student has access to transparent,
            honest course information before enrolling. By democratizing course
            insights, we aim to reduce academic stress and help students build
            schedules that truly fit their goals.
          </p>
        </div> */}

        <StatsSection stats={statsData} />

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

function TrustIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 2L4 5v6c0 5 4 9 8 9s8-4 8-9V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
