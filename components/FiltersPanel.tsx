"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Filters } from "@/types/filters";

interface FiltersPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export default function FiltersPanel({
  filters,
  setFilters,
  onApply,
  onReset,
}: FiltersPanelProps) {
  const [draftFilters, setDraftFilters] = useState(filters);

  const handleDraftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    setFilters(draftFilters);
    setDraftFilters(draftFilters);
    onApply?.();
  };

  const handleReset = () => {
    const reset = { university: "", department: "", language: "", level: "" };
    setFilters(reset);
    setDraftFilters(reset);
    setFilters(reset);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col md:flex-col lg:flex-row flex-wrap gap-2 lg:gap-4 w-full lg:w-auto">
          <select
            name="university"
            value={draftFilters.university}
            onChange={handleDraftChange}
            className="w-full lg:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-[#6155F5] focus:outline-none"
          >
            <option value="">All Universities</option>
            <option>American University of Beirut</option>
            <option>University of Balamand</option>
            <option>Lebanese American University</option>
            <option>Beirut Arab University</option>
            <option>Lebanese International University</option>
            <option>Université Saint-Joseph de Beyrouth</option>
          </select>

          <select
            name="department"
            value={draftFilters.department}
            onChange={handleDraftChange}
            className="w-full lg:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-[#6155F5] focus:outline-none"
          >
            <option value="">All Departments</option>
            <option>Computer Science</option>
            <option>Mathematics</option>
          </select>

          <select
            name="language"
            value={draftFilters.language}
            onChange={handleDraftChange}
            className="w-full lg:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-[#6155F5] focus:outline-none"
          >
            <option value="">Any Language</option>
            <option>English</option>
            <option>Arabic</option>
            <option>French</option>
          </select>

          <select
            name="level"
            value={draftFilters.level}
            onChange={handleDraftChange}
            className="w-full lg:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-[#6155F5] focus:outline-none"
          >
            <option value="">Any Level</option>
            <option>Undergraduate</option>
            <option>Graduate</option>
            <option>Phd</option>
          </select>
        </div>

        <div className="flex gap-2 mt-2 lg:mt-0">
          <Button onClick={handleApply} className="text-sm w-full lg:w-auto">
            Apply
          </Button>
          <Button
            onClick={(e) => {
              handleReset();
              if (onReset) onReset();
            }}
            className="text-sm w-full lg:w-auto"
            variant="elevated"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
