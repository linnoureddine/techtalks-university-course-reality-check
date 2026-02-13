"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import Button from "./Button";
import { User, LogOut } from "lucide-react";

type User = {
  name: string;
};

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);
  useEffect(() => {
    (window as any).__login = () => setUser({ name: "Student" });
    (window as any).__logout = () => setUser(null);
  }, []);

  function handleLogout() {
    setUser(null);
    setAccountOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4 w-full">
        {/* Hamburger Menu - always on the left */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-lg text-gray-600"
          aria-label="Menu"
          type="button"
        >
          ☰
        </button>

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
          <span className="hidden md:inline text-[#6155F5] text-2xl font-bold">
            Coursality
          </span>
        </Link>

        <div className="flex-1 flex justify-center lg:justify-center">
          <div className="hidden lg:flex gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center h-9">
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 transition-colors group h-9 w-9 flex items-center justify-center"
                aria-label="Search"
                type="button"
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
            ) : (
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 h-9 focus:outline-none focus:ring-2 focus:ring-[#6155F5] w-32 md:w-56"
                onBlur={() => setSearchOpen(false)}
              />
            )}
          </div>

          <div className="relative" ref={accountRef}>
            {!user ? (
              <div className="hidden lg:flex gap-2">
                <Link href="/login">
                  <Button variant="elevated">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Account menu"
                >
                  <User className="h-5 w-5 text-gray-600" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 flex flex-col py-1">
                    <Link
                      href="/account"
                      className="px-6 py-2 text-gray-700 rounded-none shadow-none hover:text-[#6155F5] transition-colors"
                      onClick={() => setAccountOpen(false)}
                    >
                      View Account
                    </Link>
                    <Link
                      href="/account"
                      className="px-6 py-2 text-gray-700 rounded-none shadow-none hover:text-red-600 transition-colors"
                      onClick={() => setAccountOpen(false)}
                    >
                      Report a Problem
                    </Link>
                    <Button
                      variant="plain"
                      className="px-4 py-2 text-gray-700 text-left hover:text-[#6155F5] rounded-none shadow-none"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 inline-block mr-1" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-3">
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/">Home</NavLink>
          </div>
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/courses">Courses</NavLink>
          </div>
          <div onClick={() => setMenuOpen(false)}>
            <NavLink href="/about">About</NavLink>
          </div>

          {!user ? (
            <div className="flex gap-2 mt-2">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="elevated" className="w-full flex-1">
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                <Button variant="primary" className="w-full flex-1">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Button className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
