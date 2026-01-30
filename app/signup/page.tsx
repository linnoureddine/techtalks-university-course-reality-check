"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ fullName, email, password, university });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-[#f3f4f6] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-[#111827]">
            Sign up
          </h1>

          <p className="mt-3 text-center text-base text-gray-500">
            Join thousands of students making informed decisions
          </p>

          <div className="mt-6 h-px w-full bg-gray-200" />

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                Full name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full rounded-full border border-gray-200 bg-white/60 px-6 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                University email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@university.edu"
                autoComplete="email"
                className="w-full rounded-full border border-gray-200 bg-white/60 px-6 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full rounded-full border border-gray-200 bg-white/60 px-6 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                University Name
              </label>
              <input
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Enter your university"
                className="w-full rounded-md border border-gray-300 bg-white/50 px-4 py-3 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-[#6155F5] px-16 py-3 text-xl font-medium text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:bg-indigo-700 active:scale-[0.99]"
              >
                Sign up
              </button>
            </div>
            <p className="pt-2 text-center text-lg text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
