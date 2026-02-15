"use client";

type UserRow = {
  name: string;
  email: string;
  university: string;
  role: string;
  joined: string;
  protected?: boolean;
};

const users: UserRow[] = [
  {
    name: "Admin user",
    email: "admin@coursecompass.com",
    university: "N/A",
    role: "Super Admin",
    joined: "2024-1-1",
    protected: true,
  },
  {
    name: "sara admin",
    email: "sara@coursecompass.com",
    university: "N/A",
    role: "Admin",
    joined: "2024-2-1",
  },
  {
    name: "John Doe",
    email: "john@university.edu",
    university: "Lebanese University",
    role: "Student",
    joined: "15-1-2024",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.ca",
    university: "LIU",
    role: "Student",
    joined: "20-3-2024",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-[#111827]">
        Admin Dashboard
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage platform content and monitor activity
      </p>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#111827]">
          User Management
        </h2>

        <button
          type="button"
          className="h-9 rounded-lg bg-[#6155F5] px-4 text-sm font-medium text-white hover:bg-[#503fdc] transition"
          onClick={() => alert("Add Admins clicked (connect later)")}
        >
          Add Admins
        </button>
      </div>

      <div className="mt-10">
  <div className="w-full max-w-[760px]">
    <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <table className="w-full border-collapse text-[12px]">

              <thead>
                <tr className="text-left">
                  <th className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    user
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    University
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Joined
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="align-top">
                    <td className="border-b border-gray-200 px-3 py-2">
                      <div className="text-[11px] font-medium text-gray-900">
                        {u.name}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {u.email}
                      </div>
                    </td>

                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">
                      {u.university}
                    </td>

                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">
                      {u.role}
                    </td>

                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">
                      {u.joined}
                    </td>

                    <td className="border-b border-gray-200 px-3 py-2">
                      {u.protected ? (
                        <span className="text-[10px] text-gray-400">
                          protected
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded p-1 hover:bg-gray-50"
                          aria-label={`Delete ${u.name}`}
                          onClick={() =>
                            alert(`Delete ${u.email} (connect later)`)
                          }
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-red-500"
    >
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 6V4h8v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 6l1 16h10l1-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
