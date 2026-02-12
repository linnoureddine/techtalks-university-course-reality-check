"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BORDER = "border-[#888888]";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const itemBase = "flex items-center gap-3 px-3 py-2 text-sm transition";
  const inactive = "text-gray-500";
  const activePill = "bg-[#C9C6FF] text-[#5B5BFF] font-medium rounded-lg";
  const inactivePill = "text-gray-600 hover:bg-gray-50 rounded-lg";

  return (
    <>
      <header className={`sticky top-0 z-50 h-16 w-full bg-white border-b ${BORDER}`}>
        <div className="flex h-full items-center px-4 md:px-8 gap-3">
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <Link href="/admin" className="flex items-center gap-2 shrink-0">
            <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            <span className="hidden lg:inline text-[#6155F5] text-2xl font-bold">
              Coursality
            </span>
          </Link>

          <div className="flex-1 flex justify-center md:justify-center md:ml-16">
            <div className="relative w-full max-w-[220px] sm:max-w-[320px] md:max-w-[380px]">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]">
                <MagnifierIcon />
              </span>
              <input
                placeholder="Search..."
                className={`w-full h-11 rounded-2xl border ${BORDER} bg-white pl-12 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none`}
              />
            </div>
          </div>

          <div className="ml-auto relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-50"
              aria-label="Admin menu"
              onClick={() => setUserMenuOpen((v) => !v)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6155F5] text-sm font-semibold text-white">
                AD
              </div>

              <div className="hidden md:block text-left leading-tight">
                <div className="text-sm font-semibold text-black">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>

              <span
                className={`text-gray-500 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              >
                <CaretDownIcon />
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-[#E5E7EB] bg-white shadow-lg overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Logout clicked (connect this to your auth later).");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <aside className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-64px)] w-[220px] bg-white border-r ${BORDER}`}>
        <div className="p-6 space-y-2">
          <div className={`${itemBase} ${inactive} cursor-default`}>
            <IconDashboard />
            Dashboard
            </div>

          <div className="pt-3 text-xs text-gray-500">Manage</div>

          <Link
            href="/admin/courses"
            className={`${itemBase} ${
              isActive(pathname, "/admin/courses") ? activePill : inactivePill
            }`}
          >
            <IconCourses />
            Courses
          </Link>

          <Link
            href="/admin/users"
            className={`${itemBase} ${
              isActive(pathname, "/admin/users") ? activePill : inactivePill
            }`}
          >
            <IconUsers />
            Users
          </Link>

          <Link
            href="/admin/reviews"
            className={`${itemBase} ${
              isActive(pathname, "/admin/reviews") ? activePill : inactivePill
            }`}
          >
            <IconStar />
            Reviews
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />

          <div className={`absolute left-0 top-0 h-full w-[280px] bg-white border-r ${BORDER}`}>
            <div className={`h-16 border-b ${BORDER} flex items-center px-4`}>
              <button
                type="button"
                className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>

              <div className="flex items-center gap-2">
                <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
                <span className="text-xl font-bold text-[#6155F5]">Coursality</span>
              </div>
            </div>

            <div className="p-6 space-y-2">
              <Link href="/admin" className={`${itemBase} ${inactive}`}>
                <IconDashboard />
                Dashboard
              </Link>

              <div className="pt-3 text-xs text-gray-500">Manage</div>

              <Link
                href="/admin/courses"
                className={`${itemBase} ${
                  isActive(pathname, "/admin/courses") ? activePill : inactivePill
                }`}
              >
                <IconCourses />
                Courses
              </Link>

              <Link
                href="/admin/users"
                className={`${itemBase} ${
                  isActive(pathname, "/admin/users") ? activePill : inactivePill
                }`}
              >
                <IconUsers />
                Users
              </Link>

              <Link
                href="/admin/reviews"
                className={`${itemBase} ${
                  isActive(pathname, "/admin/reviews") ? activePill : inactivePill
                }`}
              >
                <IconStar />
                Reviews
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MagnifierIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M16.2 16.2L21 21"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaretDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M4 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M4 16l5-5 4 4 7-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCourses() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M6 4h11a2 2 0 012 2v14H8a2 2 0 00-2 2V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M6 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c1.5-3 4.2-5 8-5s6.5 2 8 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M12 3l2.6 5.7 6.2.6-4.7 4 1.4 6-5.5-3.2-5.5 3.2 1.4-6-4.7-4 6.2-.6L12 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
