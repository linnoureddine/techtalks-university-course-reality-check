"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ email, password, remember });

    router.push("/");
  }

  return (
    <div className="w-full max-w-[420px] rounded-xl bg-white border border-gray-200 shadow-lg px-6 py-6">
      <h1 className="text-center text-2xl font-semibold text-[#111827]">
        Login
      </h1>

      <p className="mt-1 text-center text-sm text-gray-500">
        Log in to continue
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="your.email@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 accent-[#6155F5]"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-[#6155F5] text-white text-sm font-medium shadow-md hover:bg-[#503fdc] active:scale-[0.99]"
        >
          Log in
        </button>

        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <Link href="/signup" className="text-[#6155F5] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
