"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ email, password, remember });
  }

  return (
    <div className="w-full max-w-[520px] rounded-2xl bg-[#f3f4f6] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-5 py-7 sm:px-8 sm:py-9">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
        Login
      </h1>

      <p className="mt-2 text-center text-sm sm:text-base text-gray-500">
        Log in to your account to continue
      </p>

      <div className="mt-5 h-px w-full bg-gray-200" />

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@university.edu"
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-gray-500">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-400 accent-indigo-600"
            />
            <span className="text-sm sm:text-base">Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm sm:text-base text-gray-500 hover:text-gray-700"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2 flex justify-center">
          <Button type="submit" className="px-10 sm:px-14 py-2.5 sm:py-3 text-base sm:text-lg">
            Log in
          </Button>
        </div>

        <p className="pt-2 text-center text-sm sm:text-base text-gray-400">
          Don’t have an account yet?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
