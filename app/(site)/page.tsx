import Hero from "../../components/Hero";
import Link from "next/link";
import CourseCard from "../../components/CourseCard";
import HowItWorks from "../../components/HowItWorks";
import FeedbackCarousel from "../../components/FeedbackCarousel";

async function getRandomCourses() {
  try {
    // Fetch a page of courses then pick 2 at random
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/courses?limit=50&page=1`,
      { next: { revalidate: 3600 } }, // revalidate every hour
    );
    if (!res.ok) return [];
    const data = await res.json();
    const courses: any[] = data.courses ?? [];

    // Shuffle and return 2
    for (let i = courses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [courses[i], courses[j]] = [courses[j], courses[i]];
    }
    return courses.slice(0, 2);
  } catch {
    return [];
  }
}

export default async function Home() {
  const courses = await getRandomCourses();

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
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.courseId}
                courseId={course.courseId}
                code={course.code}
                title={course.title}
                university={course.university}
                department={course.department}
                credits={`${course.credits} cr.`}
                level={course.level}
                language={course.language}
                averageRating={course.averageRating ?? null}
                description={course.description}
                ratings={
                  course.ratings ?? {
                    exam: null,
                    workload: null,
                    attendance: null,
                    grading: null,
                  }
                }
                reviewCount={course.reviewCount ?? 0}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-2 text-center py-10">
              Could not load courses.
            </p>
          )}
        </div>
      </section>

      <HowItWorks />
      <FeedbackCarousel />
    </main>
  );
}
