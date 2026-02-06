import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  return (
    <main className="min bg-[#FFFFFF] px-6 py-6">
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="mt-2 text-gray-500 max-w-xl">
            Explore and filter courses by university, department, and rating.
          </p>
        </div>

        <button className="flex items-center justify-center rounded-lg hover:bg-gray-50 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17V12.414L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-col gap-8">
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
    </main>
  );
}
