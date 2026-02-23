"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { Plus, Search, Trash2, Shield } from "lucide-react";
import AddAdminCard, { type AdminUser } from "@/components/admin/AddAdminCard";
import ConfirmModal from "@/components/admin/ConfirmModal";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin";
  joined: string;
  protected?: boolean;
};

type UserFilters = {
  role: "" | UserRow["role"];
};

const initialUsers: UserRow[] = [
  {
    id: "1",
    name: "Admin user",
    email: "admin@coursecompass.com",
    role: "Super Admin",
    joined: "2024-01-01",
    protected: true,
  },
  {
    id: "2",
    name: "Sara Haddad",
    email: "sara.haddad@coursecompass.com",
    role: "Admin",
    joined: "2024-02-15",
  },
  {
    id: "3",
    name: "Karim Mansour",
    email: "karim.mansour@coursecompass.com",
    role: "Admin",
    joined: "2024-03-10",
  },
  {
    id: "4",
    name: "Maya Khoury",
    email: "maya.khoury@coursecompass.com",
    role: "Admin",
    joined: "2024-04-05",
  },
  {
    id: "5",
    name: "Rami Nader",
    email: "rami.nader@coursecompass.com",
    role: "Admin",
    joined: "2024-05-18",
  },
];

function isValidEmail(email: string) {
  const trimmed = email.trim();
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(trimmed);
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<UserFilters>({ role: "" });
  const [pendingDelete, setPendingDelete] = useState<UserRow | null>(null);
  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);

      const matchesRole = !filters.role || u.role === filters.role;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, filters]);
  const displayUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const ap = a.protected ? 1 : 0;
      const bp = b.protected ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return 0;
    });
  }, [filteredUsers]);

  function handleDelete(user: UserRow) {
    if (user.protected) return;
    setPendingDelete(user);
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== pendingDelete.id));
    setPendingDelete(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {pendingDelete && (
        <ConfirmModal
          title="Delete user?"
          description={
            <>
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
                {pendingDelete.name}
              </span>{" "}
              (
              <span className="font-mono text-gray-600">
                {pendingDelete.email}
              </span>
              )?
            </>
          }
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage platform users and admin access
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAdminForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> Add Admin
        </Button>
      </div>

      {showAdminForm && (
        <div className="mt-4">
          <AddAdminCard
            onClose={() => setShowAdminForm(false)}
            onSave={(admin: AdminUser) => {
              const cleanEmail = admin.email.trim();

              if (!isValidEmail(cleanEmail)) {
                alert("Please enter a valid email (name@domain.com)");
                return;
              }

              const newUser: UserRow = {
                id: String(Date.now()),
                name: admin.name.trim(),
                email: cleanEmail,
                role: admin.role as UserRow["role"],
                joined: new Date().toISOString().slice(0, 10),
                protected: false,
              };

              setUsers((prev) => [newUser, ...prev]);
              setShowAdminForm(false);
            }}
          />
        </div>
      )}

      <div className="mt-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a user..."
          className="w-full h-11 pl-10 pr-4 rounded-md border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-[#6155F5]
          focus:border-[#6155F5]"
        />
      </div>
      {/* Desktop Table */}
<div className="mt-6 hidden md:block rounded-xl border border-gray-200 bg-white overflow-x-auto">
  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-50 text-gray-500">
      <tr className="border-b border-gray-200">
        <th className="text-left px-4 py-3">User</th>
        <th className="text-left px-4 py-3">Email</th>
        <th className="text-left px-4 py-3">Role</th>
        <th className="text-left px-4 py-3">Joined</th>
        <th className="text-right px-4 py-3">Actions</th>
      </tr>
    </thead>

    <tbody>
      {displayUsers.map((u) => (
        <tr
          key={u.id}
          className="border-t border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
          <td className="px-4 py-3 text-gray-700">{u.email}</td>
          <td className="px-4 py-3">
            <RolePill role={u.role} />
          </td>
          <td className="px-4 py-3 text-gray-700">{u.joined}</td>
          <td className="px-4 py-3 text-right">
            {u.protected ? (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Shield size={16} /> Protected
              </span>
            ) : (
              <button
                onClick={() => handleDelete(u)}
                className="hover:text-red-500"
                aria-label="Delete user"
              >
                <Trash2 size={16} />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {displayUsers.length === 0 && (
    <div className="py-8 text-center text-gray-500">No users found.</div>
  )}
</div>

{/* Mobile Cards */}
<div className="mt-6 md:hidden flex flex-col gap-3">
  {displayUsers.length === 0 ? (
    <div className="py-8 text-center text-gray-500">No users found.</div>
  ) : (
    displayUsers.map((u) => (
      <div
        key={u.id}
        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{u.name}</p>
            <p className="text-sm text-gray-600 truncate">{u.email}</p>
          </div>

          <div className="shrink-0">
            {u.protected ? (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Shield size={16} /> Protected
              </span>
            ) : (
              <button
                onClick={() => handleDelete(u)}
                className="text-gray-400 hover:text-red-500 transition"
                aria-label="Delete user"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <RolePill role={u.role} />
          <span className="text-xs text-gray-500">Joined: {u.joined}</span>
        </div>
      </div>
    ))
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

  return (
    <span className={`${base} bg-blue-50 text-blue-700 border-blue-100`}>
      {role}
    </span>
  );
}