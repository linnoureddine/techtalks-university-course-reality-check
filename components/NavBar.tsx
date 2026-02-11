"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import Button from "./Button";
import Image from "next/image";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "User";

  function handleLogout() {
    setIsLoggedIn(false);
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/favicon.ico" alt="Logo" width={32} height={32} />

          <span className="hidden lg:inline text-[#6155F5] text-2xl font-bold">
            Coursality
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

          {!isLoggedIn ? (
            <Link href="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Hi, {userName}
              </span>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}

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
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/">Home</NavLink>
          </div>
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/courses">Courses</NavLink>
          </div>
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/about">About</NavLink>
          </div>

          <div className="pt-2 border-t border-gray-100">
            {!isLoggedIn ? (
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Sign Up
                </Button>
              </Link>
            ) : (
              <Button variant="primary" onClick={handleLogout}>

                Logout
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsLoggedIn((v) => !v)}
            className="text-xs text-gray-400 underline text-left"
          >
            (temp) toggle login state
          </button>
        </div>
      )}
    </nav>
  );
}
