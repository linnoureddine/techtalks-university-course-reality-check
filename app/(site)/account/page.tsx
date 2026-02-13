"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";

const universities = [
  "Lebanese University",
  "American University of Beirut",
  "Lebanese American University",
  "Beirut Arab University",
  "Saint Joseph University",
  "University of Balamand",
  "Lebanese International University",
];

export default function AccountPage() {
  const [formData, setFormData] = useState({
    fullName: "Lin Noureddine",
    university: "Lebanese University",
    email: "lin@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving", formData);
  };

  //when the user wants to change either uni or email, we have to confirm that they match (email domain and uni name)

  const handlePasswordChange = () => {};
  const handleDeleteAccount = () => {};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
        Account Info
      </h1>

      <section className="w-full max-w-md rounded-xl bg-white border border-gray-200 p-6 shadow-lg">
        <h2 className="text-xl font-medium mb-6 text-gray-700">Profile</h2>
        <div className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-600">
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
            />
          </label>

          <label className="flex flex-col text-gray-600">
            <UniversityField />
          </label>

          <label className="flex flex-col text-gray-600">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
            />
          </label>

          <div className="flex gap-3 mt-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
            <Button
              variant="plain"
              className="flex-1 text-red-600 border border-red-600 hover:bg-red-50 hover:ring-0 focus:ring-0"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </section>

      <div className="flex gap-4 mt-6">
        <Button
          variant="elevated"
          onClick={() => console.log("Cancel changes")}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}

export function UniversityField() {
  const [formData, setFormData] = useState({ university: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);

        if (!formData.university) {
          setFormData({ university: universities[0] });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formData.university]);

  const handleSelect = (uni: string) => {
    setFormData({ university: uni });
    setShowDropdown(false);
  };

  return (
    <label className="flex flex-col text-gray-600">
      University
      <div ref={wrapperRef} className="relative w-full">
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={(e) => setFormData({ university: e.target.value })}
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6155F5] w-full"
        />
        {showDropdown && (
          <ul className="absolute top-full left-0 z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto">
            {universities.map((uni) => (
              <li
                key={uni}
                onMouseDown={() => handleSelect(uni)}
                className="px-3 py-2 hover:bg-[#6155F5] hover:text-white cursor-pointer"
              >
                {uni}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
}
