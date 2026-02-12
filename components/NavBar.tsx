"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import Button from "./Button";

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
          

          {!user ? (
            <Link href="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          ) : (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {user.name}
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 text-lg text-gray-600"
            aria-label="Menu"
            type="button"
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

          {!user ? (
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Sign Up
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/account" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Account</Button>
              </Link>
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
