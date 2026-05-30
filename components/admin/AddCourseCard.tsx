"use client";

// Renders the admin AddCourseCard interface component.
import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import Button from "@/components/Button";
import SearchableDropdownField from "@/components/SearchableDropdown";
import {
  COURSE_LEVEL_OPTIONS,
  type CourseLevel,
  formatCourseLevel,
} from "@/lib/courseLevels";

export type AddCoursePayload = {
  code: string;
  title: string;
  description: string;
  videoUrl?: string | null;
  videoTitle?: string | null;
  credits: number;
  language: string;
  level: CourseLevel;
  department_id: number;
  major_id: number;
  prerequisite_course_ids: number[];
};

export type CreatedCourse = AddCoursePayload & {
  course_id: number;
  department: string;
  majorIds: number[];
  majors: string[];
  university_id: number;
  university: string;
  deleted_at: string | null;
  prerequisites: PrerequisiteCourse[];
  rating: number;
  number_of_reviews: number;
  metrics: {
    exam: number;
    workload: number;
    attendance: number;
    grading: number;
  };
};

type PrerequisiteCourse = {
  course_id: number;
  code: string;
  title: string;
};

export type PrerequisiteCourseOption = PrerequisiteCourse & {
  department_id: number;
  department: string;
  university_id: number;
  university: string;
};

type University = {
  university_id: number;
  name: string;
  email_domain?: string;
};

type Department = {
  department_id: number;
  name: string;
};

type Major = {
  major_id: number;
  name: string;
};

type Props = {
  courseOptions?: PrerequisiteCourseOption[];
  onClose: () => void;
  onSave: (course: CreatedCourse) => void;
};

const LANGUAGES = ["English", "Arabic", "French", "German", "Spanish", "Other"];

function formatPrerequisiteOption(course: PrerequisiteCourseOption) {
  return `${course.code} - ${course.title} (${course.department})`;
}

export default function AddCourseCard({
  courseOptions = [],
  onClose,
  onSave,
}: Props) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingMajors, setLoadingMajors] = useState(false);

  const [universityInput, setUniversityInput] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(
    null,
  );
  const [departmentInput, setDepartmentInput] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(
    null,
  );
  const [majorInput, setMajorInput] = useState("");
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [selectedPrerequisiteIds, setSelectedPrerequisiteIds] = useState<
    number[]
  >([]);

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    videoUrl: "",
    videoTitle: "",
    credits: "",
    language: "English",
    level: "freshman" as CourseLevel,
  });

  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingUniversities(true);
    fetch("/api/admin/universities", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUniversities(data.universities ?? []);
      })
      .catch(() => setApiError("Failed to load universities."))
      .finally(() => setLoadingUniversities(false));
  }, []);

  useEffect(() => {
    setDepartments([]);
    setMajors([]);
    setDepartmentInput("");
    setSelectedDepartmentId(null);
    setMajorInput("");
    setSelectedMajorId(null);
    setPrerequisiteInput("");
    setSelectedPrerequisiteIds([]);

    if (selectedUniversityId == null) return;

    setLoadingDepartments(true);
    fetch(`/api/admin/universities/${selectedUniversityId}/departments`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setDepartments(data.departments ?? []);
      })
      .catch(() => setApiError("Failed to load departments."))
      .finally(() => setLoadingDepartments(false));
  }, [selectedUniversityId]);

  useEffect(() => {
    setMajors([]);
    setMajorInput("");
    setSelectedMajorId(null);

    if (selectedUniversityId == null || selectedDepartmentId == null) return;

    setLoadingMajors(true);
    fetch(
      `/api/admin/universities/${selectedUniversityId}/departments/${selectedDepartmentId}/majors`,
      {
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMajors(data.majors ?? []);
      })
      .catch(() => setApiError("Failed to load majors."))
      .finally(() => setLoadingMajors(false));
  }, [selectedDepartmentId, selectedUniversityId]);

  function handleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const prerequisiteCourseById = useMemo(
    () =>
      new Map(
        courseOptions.map((course) => [course.course_id, course] as const),
      ),
    [courseOptions],
  );

  const eligiblePrerequisiteCourses = useMemo(() => {
    if (selectedUniversityId == null) return [];

    const normalizedNewCode = formData.code.trim().toLowerCase();

    return courseOptions
      .filter((course) => {
        const isSameUniversity = course.university_id === selectedUniversityId;
        const isAlreadySelected = selectedPrerequisiteIds.includes(
          course.course_id,
        );
        const matchesNewCourseCode =
          selectedDepartmentId != null &&
          course.department_id === selectedDepartmentId &&
          normalizedNewCode.length > 0 &&
          course.code.trim().toLowerCase() === normalizedNewCode;

        return isSameUniversity && !isAlreadySelected && !matchesNewCourseCode;
      })
      .sort((a, b) => {
        const aSameDepartment =
          selectedDepartmentId != null && a.department_id === selectedDepartmentId;
        const bSameDepartment =
          selectedDepartmentId != null && b.department_id === selectedDepartmentId;

        if (aSameDepartment !== bSameDepartment) {
          return aSameDepartment ? -1 : 1;
        }

        return a.code.localeCompare(b.code);
      });
  }, [
    courseOptions,
    formData.code,
    selectedDepartmentId,
    selectedPrerequisiteIds,
    selectedUniversityId,
  ]);

  const selectedPrerequisiteCourses = useMemo(
    () =>
      selectedPrerequisiteIds
        .map((courseId) => prerequisiteCourseById.get(courseId))
        .filter((course): course is PrerequisiteCourseOption => Boolean(course)),
    [prerequisiteCourseById, selectedPrerequisiteIds],
  );

  function handleAddPrerequisite() {
    const selected = prerequisiteInput.trim();
    const match = eligiblePrerequisiteCourses.find(
      (course) =>
        formatPrerequisiteOption(course).toLowerCase() ===
        selected.toLowerCase(),
    );

    if (!match) {
      setApiError("Select a prerequisite course from the list before adding.");
      return;
    }

    setSelectedPrerequisiteIds((prev) =>
      prev.includes(match.course_id) ? prev : [...prev, match.course_id],
    );
    setPrerequisiteInput("");
    setApiError(null);
  }

  function handleRemovePrerequisite(courseId: number) {
    setSelectedPrerequisiteIds((prev) =>
      prev.filter((selectedId) => selectedId !== courseId),
    );
  }

  async function handleSubmit() {
    setApiError(null);

    if (!selectedUniversityId) {
      setApiError("Please select a university from the list.");
      return;
    }

    if (!selectedDepartmentId) {
      setApiError("Please select a department from the selected university.");
      return;
    }

    if (!selectedMajorId) {
      setApiError("Please select a major from the selected department.");
      return;
    }

    if (!formData.code.trim() || !formData.title.trim()) {
      setApiError("Course code and title are required.");
      return;
    }

    if (prerequisiteInput.trim()) {
      setApiError("Click Add Prerequisite or clear the prerequisite field.");
      return;
    }

    const creditsNum = Number(formData.credits);
    if (
      !formData.credits ||
      Number.isNaN(creditsNum) ||
      creditsNum < 1 ||
      creditsNum > 9
    ) {
      setApiError("Credits must be a number between 1 and 9.");
      return;
    }

    const payload: AddCoursePayload = {
      code: formData.code.trim(),
      title: formData.title.trim(),
      description: formData.description.trim() || "No description yet.",
      videoUrl: formData.videoUrl.trim() || null,
      videoTitle: formData.videoTitle.trim() || null,
      credits: creditsNum,
      language: formData.language,
      level: formData.level,
      department_id: selectedDepartmentId,
      major_id: selectedMajorId,
      prerequisite_course_ids: selectedPrerequisiteIds,
    };

    try {
      setSaving(true);
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setApiError(data?.message ?? "Failed to create course.");
        return;
      }

      onSave(data.course as CreatedCourse);
      onClose();
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const universityNames = universities.map((university) => university.name);
  const departmentNames = departments.map((department) => department.name);
  const majorNames = majors.map((major) => major.name);
  const departmentPlaceholder =
    selectedUniversityId == null
      ? "Select university first"
      : loadingDepartments
        ? "Loading departments..."
        : departments.length === 0
          ? "Add departments in University Setup first"
          : "Select department";
  const majorPlaceholder =
    selectedDepartmentId == null
      ? "Select department first"
      : loadingMajors
        ? "Loading majors..."
        : majors.length === 0
          ? "Add majors in University Setup first"
          : "Select major";
  const levelLabel =
    selectedUniversityId == null ? "" : formatCourseLevel(formData.level);

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Course
          </h2>
          <p className="text-sm text-gray-500">
            Select a university, department, and major, then add the course
            details.
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {apiError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchableDropdownField
          value={universityInput}
          options={universityNames}
          placeholder={
            loadingUniversities ? "Loading universities..." : "Select university"
          }
          onChange={(typed) => {
            setUniversityInput(typed);
            const match = universities.find(
              (university) =>
                university.name.toLowerCase() === typed.trim().toLowerCase(),
            );
            setSelectedUniversityId(match?.university_id ?? null);
          }}
        />

        <SearchableDropdownField
          value={departmentInput}
          options={selectedUniversityId == null ? [] : departmentNames}
          placeholder={departmentPlaceholder}
          onChange={(typed) => {
            setDepartmentInput(typed);
            const match = departments.find(
              (department) =>
                department.name.toLowerCase() === typed.trim().toLowerCase(),
            );
            setSelectedDepartmentId(match?.department_id ?? null);
          }}
        />

        <SearchableDropdownField
          value={majorInput}
          options={selectedDepartmentId == null ? [] : majorNames}
          placeholder={majorPlaceholder}
          onChange={(typed) => {
            setMajorInput(typed);
            const match = majors.find(
              (major) =>
                major.name.toLowerCase() === typed.trim().toLowerCase(),
            );
            setSelectedMajorId(match?.major_id ?? null);
          }}
        />

        <input
          name="code"
          value={formData.code}
          onChange={handleTextChange}
          placeholder="Course Code (e.g. CMPS 101)"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleTextChange}
          placeholder="Course Title"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <input
          name="credits"
          value={formData.credits}
          onChange={handleTextChange}
          placeholder="Credits (1-9)"
          type="number"
          min={1}
          max={9}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <SearchableDropdownField
          value={levelLabel}
          options={
            selectedUniversityId == null
              ? []
              : COURSE_LEVEL_OPTIONS.map((level) => level.label)
          }
          placeholder={
            selectedUniversityId == null ? "Select university first" : "Select level"
          }
          onChange={(typed) => {
            const selectedLevel = COURSE_LEVEL_OPTIONS.find(
              (level) => level.label === typed,
            );
            if (!selectedLevel) return;
            setFormData((prev) => ({
              ...prev,
              level: selectedLevel.value,
            }));
          }}
        />

        <SearchableDropdownField
          value={formData.language}
          options={LANGUAGES}
          placeholder="Select language"
          onChange={(typed) =>
            setFormData((prev) => ({ ...prev, language: typed }))
          }
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          placeholder="Course Description"
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5] md:col-span-2"
        />

        <input
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleTextChange}
          placeholder="Course Video URL (YouTube, Vimeo, or MP4)"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <input
          name="videoTitle"
          value={formData.videoTitle}
          onChange={handleTextChange}
          placeholder="Video Title (optional)"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />

        <div className="border-t border-gray-100 pt-4 md:col-span-2">
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-800">
              Prerequisite courses
            </label>
            <p className="text-xs text-gray-400">
              Add any course students should complete before this one.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchableDropdownField
              value={prerequisiteInput}
              options={eligiblePrerequisiteCourses.map(formatPrerequisiteOption)}
              placeholder={
                selectedUniversityId == null
                  ? "Select university first"
                  : eligiblePrerequisiteCourses.length === 0
                    ? "No available prerequisite courses"
                    : "Search prerequisite course"
              }
              onChange={setPrerequisiteInput}
            />
            <button
              type="button"
              onClick={handleAddPrerequisite}
              disabled={
                selectedUniversityId == null ||
                eligiblePrerequisiteCourses.length === 0
              }
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#6155F5] px-3 text-sm font-medium text-[#4f45d4] transition hover:bg-[#EEF2FF] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              <Plus size={14} />
              Add Prerequisite
            </button>
          </div>

          {selectedPrerequisiteCourses.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedPrerequisiteCourses.map((course) => (
                <span
                  key={course.course_id}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  <span className="truncate">
                    {course.code} - {course.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePrerequisite(course.course_id)}
                    className="shrink-0 rounded text-gray-400 transition hover:text-red-500"
                    aria-label={`Remove ${course.code} prerequisite`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-gray-400">
              No prerequisites selected.
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Button onClick={onClose} variant="elevated" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary" disabled={saving}>
          {saving ? "Saving..." : "Save Course"}
        </Button>
      </div>
    </div>
  );
}
