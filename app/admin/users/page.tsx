"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { Plus, Search, Trash2, Shield } from "lucide-react";
import AddAdminCard from "@/components/admin/AddAdminCard";


type UserRow = {
  id: string;
  name: string;
  email: string;
  university: string;
  role: "Super Admin" | "Admin" | "Student";
  joined: string;
  protected?: boolean;
};

type UserFilters = {
  role: "" | UserRow["role"];
  university: string;
};

const initialUsers: UserRow[] = [
  {
    id: "1",
    name: "Admin user",
    email: "admin@coursecompass.com",
    university: "N/A",
    role: "Super Admin",
    joined: "2024-01-01",
    protected: true,
  },
  {
    id: "2",
    name: "sara admin",
    email: "sara@coursecompass.com",
    university: "N/A",
    role: "Admin",
    joined: "2024-02-01",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@university.edu",
    university: "Lebanese University",
    role: "Student",
    joined: "2024-01-15",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@gmail.com",
    university: "LIU",
    role: "Student",
    joined: "2024-03-20",
  },
];

export default function AdminUsersPage() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({
    role: "",
    university: "",
  });

  const universities = useMemo(() => {
    const set = new Set(users.map((u) => u.university).filter(Boolean));
    return Array.from(set).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.university.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);

      const matchesRole = !filters.role || u.role === filters.role;
      const matchesUniversity =
        !filters.university || u.university === filters.university;

      return matchesSearch && matchesRole && matchesUniversity;
    });
  }, [users, searchQuery, filters]);
  function handleDelete(user: UserRow) {
    if (user.protected) return;
    alert(`Delete ${user.email} (connect later)`);

  }

  function resetFilters() {
    setFilters({ role: "", university: "" });
    setShowFilters(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage platform users and admin access
          </p>
        </div>

        <div className="flex justify-center sm:justify-start items-center">
          <Button variant="primary" onClick={() => setShowAdminForm(true)} className="flex items-center gap-2" >
            <Plus size={18} className="shrink-0"/> Add Admin
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a user, email, university, role..."
            className="w-full h-11 pl-10 pr-4 text-gray-900 placeholder-gray-400
              rounded-md border border-gray-300 transition-colors
              focus:outline-none focus:border-[#6155F5]
              focus:ring-2 focus:ring-[#6155F5]"
          />
        </div>

        <button
          className="h-11 px-3 flex items-center justify-center rounded-md
            border border-gray-300 hover:bg-gray-50 transition"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-label="Toggle filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17V12.414L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </button>
      </div>
      {showAdminForm && (<AddAdminCard onClose={() => setShowAdminForm(false)}onSave={(admin) => {
        setShowAdminForm(false);
    }}
  />
)}
      {showFilters && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Role
              </label>
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    role: e.target.value as UserFilters["role"],
                  }))
                }
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm
                  focus:outline-none focus:border-[#6155F5]
                  focus:ring-2 focus:ring-[#6155F5]"
              >
                <option value="">All</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                University
              </label>
              <select
                value={filters.university}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, university: e.target.value }))
                }
                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm
                  focus:outline-none focus:border-[#6155F5]
                  focus:ring-2 focus:ring-[#6155F5]"
              >
                <option value="">All</option>
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowFilters(false)}
                className="h-10 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm"
              >
                Apply
              </button>
              <button
                onClick={resetFilters}
                className="h-10 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:block mt-6 rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">University</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Joined</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{u.name}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="px-4 py-3 text-gray-700 max-w-[220px] truncate" title={u.email}>{u.email}</div>
                </td>

                <td className="px-4 py-3">{u.university}</td>

                <td className="px-4 py-3">
                  <RolePill role={u.role} />
                </td>

                <td className="px-4 py-3 text-gray-700">{u.joined}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3 text-gray-400">
                    {u.protected ? (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Shield size={16} /> Protected
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDelete(u)}
                        className="hover:text-red-500"
                        aria-label={`Delete ${u.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No users found.
          </div>
        )}
      </div>
      <div className="md:hidden mt-6 flex flex-col gap-4">
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{u.name}</h3>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                {u.protected ? (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Shield size={16} /> Protected
                  </span>
                ) : (
                  <button
                    onClick={() => handleDelete(u)}
                    className="hover:text-red-500"
                    aria-label={`Delete ${u.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 space-y-2">
              <p>
                <span className="text-gray-400">University:</span>{" "}
                {u.university}
              </p>
              <p>
                <span className="text-gray-400">Role:</span>{" "}
                <RolePill role={u.role} />
              </p>
              <p>
                <span className="text-gray-400">Joined:</span> {u.joined}
              </p>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}

function RolePill({ role }: { role: UserRow["role"] }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border";

  if (role === "Super Admin") {
    return (
      <span className={`${base} bg-purple-50 text-purple-700 border-purple-100`}>
        {role}
      </span>
    );
  }

  if (role === "Admin") {
    return (
      <span className={`${base} bg-blue-50 text-blue-700 border-blue-100`}>
        {role}
      </span>
    );
  }

  return (
    <span className={`${base} bg-green-50 text-green-700 border-green-100`}>
      {role}
    </span>
  );
}
