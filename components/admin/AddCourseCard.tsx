"use client";

import { X } from "lucide-react";
import Button from "@/components/Button";
import SearchableDropdownField from "@/components/SearchableDropdown";
import { useState } from "react";

type Course = {
  slug: string;
  code: string;
  title: string;
  university: string;
  department: string;
  credits: string;
  level: string;
  language: string;
  rating: number;
  description: string;
};

type Props = {
  onClose: () => void;
  onSave: (course: Course) => void;
};

const university = [
  "American University of Beirut",
  "Lebanese American University",
  "Université Saint-Joseph",
  "Lebanese University",
];

const level = ["Undergraduate", "Graduate", "PhD"];

const language = ["English", "French", "Arabic"];

export default function AddCourseCard({ onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Course>({
    slug: "",
    code: "",
    title: "",
    university: "",
    department: "",
    credits: "",
    level: "",
    language: "",
    rating: 0,
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    if (!formData.code || !formData.title) {
      alert("Please fill required fields");
      return;
    }

    onSave(formData);
    onClose();
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Course Code (CMPS 101)"
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

        <SearchableDropdownField
          value={formData.university}
          options={university}
          placeholder="Select university"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, university: value }))
          }
        />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <input
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          placeholder="Credits (3 cr.)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <SearchableDropdownField
          value={formData.level}
          options={level}
          placeholder="Select level"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, level: value }))
          }
        />

        <SearchableDropdownField
          value={formData.language}
          options={language}
          placeholder="Select language"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, language: value }))
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
        <Button onClick={onClose} variant="elevated">
          Cancel
        </Button>

        <Button onClick={handleSubmit} variant="primary">
          Save Course
        </Button>
      </div>
    </div>
  );
}
