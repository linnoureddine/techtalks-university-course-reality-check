import Hero from "../components/Hero";
import Link from "next/link";
import CourseCard from "../components/CourseCard";
import HowItWorks from "../components/HowItWorks";
import FeedbackCarousel from "../components/FeedbackCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <Hero />

        <Link
          href="/courses"
          className="mt-6 flex w-full items-center justify-between text-[#111827]"
        >
          <span className="text-xl lg:text-3xl font-extrabold tracking-tight">
            Browse Courses
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 lg:h-7 lg:w-7 transition-transform duration-200 hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </Link>

        <div className="mt-8 grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2">
          <CourseCard
            code="CMPS 204"
            title="Animation Tools"
            university="American University of Beirut"
            department="Computer Science"
            credits="3 cr."
            level="Undergraduate"
            language="English"
            rating={4.8}
            description="This course teaches students the knowledge needed to create digital prototypes of 2D and 3D games. The course covers: the conceptual framework of interactive environments, game programming approaches, techniques and tools, manipulation of visual effects and sound, object animation, movement control, worlds, and interactivity. Prerequisite: CMPS 201"
            metrics={{ exam: 4, workload: 4, attendance: 3, grading: 5 }}
            reviewsLabel="350+ Reviews"
          />

          <CourseCard
            code="CMPS 204"
            title="Animation Tools"
            university="American University of Beirut"
            department="Computer Science"
            credits="3 cr."
            level="Undergraduate"
            language="English"
            rating={4.8}
            description="This course teaches students the knowledge needed to create digital prototypes of 2D and 3D games. The course covers: the conceptual framework of interactive environments, game programming approaches, techniques and tools, manipulation of visual effects and sound, object animation, movement control, worlds, and interactivity. Prerequisite: CMPS 201"
            metrics={{ exam: 4, workload: 4, attendance: 3, grading: 5 }}
            reviewsLabel="350+ Reviews"
          />
        </div>
      </section>

      <HowItWorks />
      <FeedbackCarousel />
    </main>
  );
}
