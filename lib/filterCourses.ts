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
  {
    university = "",
    department = "",
    language = "",
    level = "",
    query = "",
  }: CourseFilters,
): Course[] {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedUniversity = university.toLowerCase().trim();
  const normalizedDepartment = department.toLowerCase().trim();
  const normalizedLanguage = language.toLowerCase().trim();
  const normalizedLevel = level.toLowerCase().trim();

  return courses.filter((course) => {
    const matchesUniversity =
      !normalizedUniversity ||
      course.university.toLowerCase() === normalizedUniversity;

    const matchesDepartment =
      !normalizedDepartment ||
      course.department.toLowerCase() === normalizedDepartment;

    const matchesLanguage =
      !normalizedLanguage ||
      course.language.toLowerCase() === normalizedLanguage;

    const matchesLevel =
      !normalizedLevel || course.level.toLowerCase() === normalizedLevel;

    const matchesQuery =
      !normalizedQuery ||
      course.title.toLowerCase().includes(normalizedQuery) ||
      course.code.toLowerCase().includes(normalizedQuery) ||
      course.university.toLowerCase().includes(normalizedQuery) ||
      course.department.toLowerCase().includes(normalizedQuery);

    return (
      matchesUniversity &&
      matchesDepartment &&
      matchesLanguage &&
      matchesLevel &&
      matchesQuery
    );
  });
}
