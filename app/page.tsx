import Stats from "../components/Stats";
import CourseCard from "../components/CourseCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-6 py-10">
      <section className="mx-auto max-w-7xl">
        <Stats />

        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#111827]">
          Browse Courses
        </h2>
        <div className="mt-8 grid justify-center gap-8 sm:grid-cols-1 md:grid-cols-2">
          <CourseCard
            code="CMPS 204"
            title="Animation Tools"
            university="American University of Beirut"
            department="Computer Science"
            credits="3 cr."
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
            rating={4.8}
            description="This course teaches students the knowledge needed to create digital prototypes of 2D and 3D games. The course covers: the conceptual framework of interactive environments, game programming approaches, techniques and tools, manipulation of visual effects and sound, object animation, movement control, worlds, and interactivity. Prerequisite: CMPS 201"
            metrics={{ exam: 4, workload: 4, attendance: 3, grading: 5 }}
            reviewsLabel="350+ Reviews"
          />
        </div>
      </section>
    </main>
  );
}
