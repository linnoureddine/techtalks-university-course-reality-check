import { Course } from "@/types/course";

interface CourseFilters {
  university?: string;
  department?: string;
  level?: string;
  language?: string;
  query?: string;
}

export function filterCourses(
  courses: Course[],
  { university = "", department = "", language = "", level = "", query = "" },
): Course[] {
  const normalizedQuery = query.toLowerCase().trim();

  return courses.filter((course) => {
    const matchesUniversity = !university || course.university === university;

    const matchesDepartment = !department || course.department === department;

    const matchesLanguage = !language || course.language === language;

    const matchesLevel = !level || course.level === level;

    const matchesQuery =
      !query ||
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.code.toLowerCase().includes(query.toLowerCase());

    return (
      matchesUniversity && matchesDepartment && matchesLanguage && matchesQuery
    );
  });
}
