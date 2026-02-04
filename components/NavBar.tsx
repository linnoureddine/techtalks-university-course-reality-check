"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-[#6155F5] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 7h6" />
            <path d="M8 11h6" />
            <path d="M8 15h4" />
          </svg>

          <span className="hidden lg:inline text-[#6155F5] text-2xl font-bold">
            Course Compass
          </span>
        </Link>

        <div className="hidden md:flex gap-6 md:flex-1 md:justify-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
          <div className="relative h-9 flex items-center w-9">
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 transition-colors group h-9 w-9 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-[#6155F5] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            )}
            {searchOpen && (
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="absolute right-0 border border-gray-300 rounded px-3 h-9 focus:outline-none focus:ring-2 focus:ring-[#6155F5] w-32 md:w-56"
                onBlur={() => setSearchOpen(false)}
              />
            )}
          </div>

          <button
            className={`bg-[#6155F5] text-white px-4 h-9 rounded hover:bg-[#503fdc] transition flex items-center ${searchOpen ? "hidden sm:block" : ""}`}
          >
            Sign Up
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 text-lg text-gray-600"
          >
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>
      )}
    </nav>
  );
}
