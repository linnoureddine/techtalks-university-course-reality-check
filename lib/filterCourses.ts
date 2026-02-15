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

  return courses.filter((course) => {
    const matchesUniversity = !university || course.university === university;

    const matchesDepartment = !department || course.department === department;

    const matchesLanguage = !language || course.language === language;

    const matchesLevel = !level || course.level === level;

    const matchesQuery =
      !normalizedQuery ||
      course.title.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
      course.university.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(normalizedQuery.toLowerCase());

    return (
      matchesUniversity &&
      matchesDepartment &&
      matchesLanguage &&
      matchesLevel &&
      matchesQuery
    );
  });
}
