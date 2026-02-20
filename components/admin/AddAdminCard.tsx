"use client";

import { X } from "lucide-react";
import Button from "@/components/Button";
import SearchableDropdownField from "@/components/SearchableDropdown";
import { useState } from "react";

export type AdminUser = {
  name: string;
  email: string;
  university: string;
  role: string;
  status: string;
  notes: string;
};

type Props = {
  onClose: () => void;
  onSave: (admin: AdminUser) => void;
};

const universities = [
  "American University of Beirut",
  "Lebanese American University",
  "Université Saint-Joseph",
  "Lebanese University",
  "N/A",
];

const roles = ["Super Admin", "Admin"];
const statuses = ["Active", "Pending", "Disabled"];

export default function AddAdminCard({ onClose, onSave }: Props) {
  const [formData, setFormData] = useState<AdminUser>({
    name: "",
    email: "",
    university: "",
    role: "",
    status: "Active",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.role) {
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
          <h2 className="text-lg font-semibold text-gray-900">Add New Admin</h2>
          <p className="text-sm text-gray-500">
            Fill in the admin account information
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email (admin@coursecompass.com)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
        bg-white focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <SearchableDropdownField
          value={formData.university}
          options={universities}
          placeholder="Select university"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, university: value }))
          }
        />

        <SearchableDropdownField
          value={formData.role}
          options={roles}
          placeholder="Select role"
          onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
        />

        <SearchableDropdownField
          value={formData.status}
          options={statuses}
          placeholder="Select status"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, status: value }))
          }
        />

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
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
          Save Admin
        </Button>
      </div>
    </div>
  );
}