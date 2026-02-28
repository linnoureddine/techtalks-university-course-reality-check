"use client";

import { X } from "lucide-react";
import Button from "@/components/Button";
import SearchableDropdownField from "@/components/SearchableDropdown";
import { useState, useEffect } from "react";

export type AddCoursePayload = {
  code: string;
  title: string;
  description: string;
  credits: number;
  language: string;
  level: string;
  department_id: number;
};

type University = { university_id: number; name: string };
type Department = { department_id: number; name: string };

type Props = {
  onClose: () => void;
  onSave: (course: any) => void;
};

const LEVELS = ["undergraduate", "graduate", "doctoral", "professional"];
const LANGUAGES = ["English", "Arabic", "French", "German", "Spanish", "Other"];

export default function AddCourseCard({ onClose, onSave }: Props) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepts, setLoadingDepts] = useState(false);

  // Separate "what's typed in the input" from "what ID is confirmed selected"
  const [universityInput, setUniversityInput] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState<
    number | null
  >(null);

  const [departmentInput, setDepartmentInput] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    credits: "",
    language: "",
    level: "",
  });

  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch universities on mount
  useEffect(() => {
    fetch("/api/admin/universities")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setUniversities(data.universities ?? []);
      })
      .catch(() => {});
  }, []);

  // Fetch departments whenever the confirmed university changes
  useEffect(() => {
    if (selectedUniversityId == null) {
      setDepartments([]);
      setDepartmentInput("");
      setSelectedDepartmentId(null);
      return;
    }
    setLoadingDepts(true);
    setDepartmentInput("");
    setSelectedDepartmentId(null);
    fetch(`/api/admin/universities/${selectedUniversityId}/departments`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDepartments(data.departments ?? []);
      })
      .catch(() => {})
      .finally(() => setLoadingDepts(false));
  }, [selectedUniversityId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    setApiError(null);

    if (!formData.code.trim() || !formData.title.trim()) {
      setApiError("Course code and title are required.");
      return;
    }
    if (!selectedDepartmentId) {
      setApiError("Please select a university and department.");
      return;
    }
    const creditsNum = Number(formData.credits);
    if (
      !formData.credits ||
      isNaN(creditsNum) ||
      creditsNum < 1 ||
      creditsNum > 9
    ) {
      setApiError("Credits must be a number between 1 and 9.");
      return;
    }
    if (!formData.language) {
      setApiError("Please select a language.");
      return;
    }
    if (!formData.level) {
      setApiError("Please select a level.");
      return;
    }

    const payload: AddCoursePayload = {
      code: formData.code.trim(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      credits: creditsNum,
      language: formData.language,
      level: formData.level,
      department_id: selectedDepartmentId,
    };

    try {
      setSaving(true);
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setApiError(data.message ?? "Failed to create course.");
        return;
      }
      onSave(data.course);
      onClose();
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const universityNames = universities.map((u) => u.name);
  const departmentNames = departments.map((d) => d.name);

  const departmentPlaceholder =
    selectedUniversityId == null
      ? "Select a university first"
      : loadingDepts
        ? "Loading departments…"
        : "Select department";

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Course
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the course information
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>
      </div>

      {apiError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Course Code (e.g. CMPS 101)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
            bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
            bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        {/*
          University: pass `universityInput` as value so the component's internal
          filter works correctly on every keystroke. The ID is only committed
          when the typed value exactly matches an option name (i.e. user clicked one).
        */}
        <SearchableDropdownField
          value={universityInput}
          options={universityNames}
          placeholder="Select university"
          onChange={(typed) => {
            setUniversityInput(typed);
            const match = universities.find((u) => u.name === typed);
            setSelectedUniversityId(match?.university_id ?? null);
          }}
        />

        {/*
          Department: same pattern. Disabled visually when no university is selected
          by passing an empty options array and a descriptive placeholder.
        */}
        <SearchableDropdownField
          value={departmentInput}
          options={selectedUniversityId == null ? [] : departmentNames}
          placeholder={departmentPlaceholder}
          onChange={(typed) => {
            setDepartmentInput(typed);
            const match = departments.find((d) => d.name === typed);
            setSelectedDepartmentId(match?.department_id ?? null);
          }}
        />

        <input
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          placeholder="Credits (1–9)"
          type="number"
          min={1}
          max={9}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
            bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <SearchableDropdownField
          value={formData.level}
          options={LEVELS}
          placeholder="Select level"
          onChange={(typed) =>
            setFormData((prev) => ({ ...prev, level: typed }))
          }
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
          onChange={handleChange}
          placeholder="Course Description"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
            bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition md:col-span-2 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button onClick={onClose} variant="elevated" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save Course"}
        </Button>
      </div>
    </div>
  );
}
