"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, password, remember });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-[#f3f4f6] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-[#111827]">
            Login
          </h1>
          <p className="mt-3 text-center text-base text-gray-500">
            log in to your account to continue
          </p>

          <div className="mt-6 h-px w-full bg-gray-200" />
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white/60 px-6 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-2xl font-semibold text-[#1E1E1E]">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white/60 px-6 py-4 text-lg text-gray-800 placeholder:text-gray-400 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 text-gray-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-400 accent-indigo-600"
                />
                <span className="text-lg">Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-lg text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="pt-3 flex justify-center">
              <button
                type="submit"
                className="rounded-lg bg-[#6155F5] px-14 py-3 text-xl font-medium text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:bg-indigo-700 active:scale-[0.99]"
              >
                Log in
              </button>
            </div>
            <p className="pt-4 text-center text-lg text-gray-400">
              Don’t have an account yet ?{" "}
              <Link href="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
