"use client";

import { X } from "lucide-react";
import Button from "@/components/Button";
import SearchableDropdownField from "@/components/SearchableDropdown";
import { useState } from "react";

export type AdminUser = {
  name: string;
  email: string;
  role: "Super Admin" | "Admin";
};

type Props = {
  onClose: () => void;
  onSave: (admin: AdminUser) => void;
};

const roles: AdminUser["role"][] = ["Super Admin", "Admin"];

export default function AddAdminCard({ onClose, onSave }: Props) {
  const [formData, setFormData] = useState<AdminUser>({
    name: "",
    email: "",
    role: "Admin",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.role) {
      alert("Please fill required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    onSave({ ...formData, name, email: email.toLowerCase() });
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
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          placeholder="Email (admin@coursecompass.com)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[#6155F5] focus:border-transparent transition"
        />

        <SearchableDropdownField
          value={formData.role}
          options={roles}
          placeholder="Select role"
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, role: value as AdminUser["role"] }))
          }
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