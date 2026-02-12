"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BORDER = "border-[#888888]";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <>
   
      <header className={`h-16 w-full bg-white border-b ${BORDER}`}>
        <div className="flex h-full items-center px-8">
          <div className="w-[220px]">
            <span className="text-2xl font-bold text-[#5B5BFF]">
              Coursality
            </span>
          </div>
          <div className="flex-1 flex justify-start">
            <div className="relative w-[380px]">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]">
                <MagnifierIcon />
              </span>

              <input
                placeholder="Search courses, users, reviews..."
                className="w-full h-11 rounded-2xl border border-[#888888] bg-white pl-12 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5BFF] text-sm font-semibold text-white">
              AD
            </div>

            <div>
              <div className="text-sm font-semibold text-black">
                Admin User
              </div>
              <div className="text-xs text-gray-500">
                admin@example.com
              </div>
            </div>
          </div>

        </div>
      </header>
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-[220px] bg-white border-r ${BORDER}`}
      >
        <div className="p-6 space-y-2">

          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              isActive(pathname, "/admin")
                ? "bg-[#DAD7FF] text-[#5B5BFF] font-medium"
                : "text-gray-600"
            }`}
          >
            Dashboard
          </Link>

          <div className="pt-3 text-xs text-gray-500">Manage</div>

          <Link
            href="/admin/courses"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              isActive(pathname, "/admin/courses")
                ? "bg-[#DAD7FF] text-[#5B5BFF] font-medium"
                : "text-gray-600"
            }`}
          >
            Courses
          </Link>

          <Link
            href="/admin/users"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              isActive(pathname, "/admin/users")
                ? "bg-[#DAD7FF] text-[#5B5BFF] font-medium"
                : "text-gray-600"
            }`}
          >
            Users
          </Link>

          <Link
            href="/admin/reviews"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
              isActive(pathname, "/admin/reviews")
                ? "bg-[#DAD7FF] text-[#5B5BFF] font-medium"
                : "text-gray-600"
            }`}
          >
            Reviews
          </Link>

        </div>
      </aside>
    </>
  );
}

function MagnifierIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M16.2 16.2L21 21"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
