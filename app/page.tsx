import CourseCard from "../components/CourseCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-[#111827]">Browse Courses</h2>

        <div className="mt-6 grid grid-cols-1 gap-35 md:grid-cols-2">
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
