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
    <div className="w-full max-w-xl rounded-2xl bg-[#f3f4f6] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-[#111827]">
        Login
      </h1>

      <p className="mt-3 text-center text-base text-gray-500">
        Log in to your account to continue
      </p>

      <div className="mt-6 h-px w-full bg-gray-200" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

        <div className="pt-4 flex justify-center">
          <Button type="submit">Log in</Button>
        </div>

        <p className="pt-4 text-center text-lg text-gray-400">
          Don’t have an account yet?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
