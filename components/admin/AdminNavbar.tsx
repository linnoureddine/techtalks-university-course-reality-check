"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  LayoutDashboard,
  Star,
  Users,
  MessageSquare,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminNavbar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar");
    if (saved) setCollapsed(saved === "collapsed");
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  useEffect(() => {
    const sidebarWidth = collapsed ? "72px" : "220px";
    document.documentElement.style.setProperty(
      "--admin-sidebar-width",
      sidebarWidth,
    );
  }, [collapsed]);

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
      if (!userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const mobileItem = `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition w-full`;
  const itemBase = `flex items-center gap-3 px-3 py-2 text-sm transition rounded-lg
  ${collapsed ? "justify-center" : ""}`;
  const activePill = "bg-[#C9C6FF] text-[#5B5BFF] font-medium";
  const inactivePill = "text-gray-600 hover:bg-gray-50";

  return (
    <>
      <header className="sticky top-0 z-50 h-16 w-full bg-white border-b border-gray-200">
        <div className="flex h-full items-center px-4 md:px-8 gap-3">
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
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

          <div className="ml-auto relative" ref={userMenuRef}>
            <button
              className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-50"
              onClick={() => setUserMenuOpen((v) => !v)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6155F5] text-sm font-semibold text-white">
                AD
              </div>

              <div className="hidden md:block text-left leading-tight">
                <div className="text-sm font-semibold">Admin User</div>
                <div className="text-xs text-gray-500">admin@example.com</div>
              </div>

              <ChevronDown
                size={18}
                className={`text-gray-500 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert("Logout clicked");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <aside
        className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200
        ${collapsed ? "w-18" : "w-55"} transition-all duration-300`}
      >
        <div className={`${collapsed ? "p-3" : "p-6"} space-y-2`}>
          <div
            className={`flex ${collapsed ? "justify-center" : "justify-between"} mb-4`}
          >
            {!collapsed && (
              <span className="text-xs font-semibold text-gray-500 mt-2">
                NAVIGATION
              </span>
            )}

            <button
              onClick={() => setCollapsed((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {collapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
          </div>

          <Link
            href="/admin"
            className={`${itemBase} ${
              isActive(pathname, "/admin") ? activePill : inactivePill
            }`}
          >
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </Link>

          {!collapsed && (
            <div className="pt-3 text-xs text-gray-500">Manage</div>
          )}

          <Link
            href="/admin/courses"
            className={`${itemBase} ${
              isActive(pathname, "/admin/courses") ? activePill : inactivePill
            }`}
          >
            <BookOpen size={18} />
            {!collapsed && "Courses"}
          </Link>

          <Link
            href="/admin/users"
            className={`${itemBase} ${
              isActive(pathname, "/admin/users") ? activePill : inactivePill
            }`}
          >
            <Users size={18} />
            {!collapsed && "Users"}
          </Link>

          <Link
            href="/admin/reviews"
            className={`${itemBase} ${
              isActive(pathname, "/admin/reviews") ? activePill : inactivePill
            }`}
          >
            <Star size={18} />
            {!collapsed && "Reviews"}
          </Link>

          <Link
            href="/admin/feedback"
            className={`${itemBase} ${
              isActive(pathname, "/admin/feedback") ? activePill : inactivePill
            }`}
          >
            <MessageSquare size={18} />
            {!collapsed && "Feedback"}
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-60">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={`absolute left-0 top-0 h-full w-55 bg-white border-r border-grey-200`}
          >
            <div
              className={`h-16 border-b border-grey-200 flex items-center px-4`}
            >
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
                <span className="text-xl font-bold text-[#6155F5]">
                  Coursality
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <Link
                href="/admin"
                className={`${mobileItem} ${
                  isActive(pathname, "/admin") ? activePill : inactivePill
                }`}
              >
                <LayoutDashboard size={18} className="shrink-0" />
                Dashboard
              </Link>

              <div className="pt-3 text-xs text-gray-500">Manage</div>

              <Link
                href="/admin/courses"
                className={`${mobileItem} ${
                  isActive(pathname, "/admin/courses")
                    ? activePill
                    : inactivePill
                }`}
              >
                <BookOpen size={18} className="shrink-0" />
                Courses
              </Link>

              <Link
                href="/admin/users"
                className={`${mobileItem} ${
                  isActive(pathname, "/admin/users") ? activePill : inactivePill
                }`}
              >
                <Users size={18} className="shrink-0" />
                Users
              </Link>

              <Link
                href="/admin/reviews"
                className={`${mobileItem} ${
                  isActive(pathname, "/admin/reviews")
                    ? activePill
                    : inactivePill
                }`}
              >
                <Star size={18} className="shrink-0" />
                Reviews
              </Link>

              <Link
                href="/admin/feedback"
                className={`${mobileItem} ${
                  isActive(pathname, "/admin/feedback")
                    ? activePill
                    : inactivePill
                }`}
              >
                <MessageSquare size={18} className="shrink-0" />
                Feedback
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
