"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ fullName, email, password, university });
  }

  return (
    <div className="w-full max-w-[420px] rounded-xl bg-white border border-gray-200 shadow-lg px-6 py-6">
      <h1 className="text-center text-2xl font-semibold text-[#111827]">
        Sign up
      </h1>

      <p className="mt-1 text-center text-sm text-gray-500">
        Create an account to continue
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Full name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@university.edu"
            autoComplete="email"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            University
          </label>
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          >
            <option value="" disabled>
              Select your university
            </option>
            <option value="LU">LU</option>
            <option value="AUB">AUB</option>
            <option value="BAU">BAU</option>
            <option value="LIU">LIU</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-[#6155F5] text-white text-sm font-medium shadow-md hover:bg-[#503fdc] active:scale-[0.99]"
        >
          Sign up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#6155F5] hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
