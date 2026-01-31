"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "./Input";
import Button from "./Button";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ fullName, email, password, university });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full name"
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
        placeholder="Enter your name"
        autoComplete="name"
      />

      <Input
        label="University email address"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="your.email@university.edu"
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder="Enter your password"
        autoComplete="new-password"
      />

      <div className="space-y-2">
        <label className="block text-2xl font-semibold text-[#1E1E1E]">
          University Name
        </label>

        <select
          value={university}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setUniversity(e.target.value)
          }
          className="w-full rounded-md border border-gray-300 bg-white/50 px-4 py-3 text-lg text-gray-800 shadow-inner outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
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

      <div className="pt-4 flex justify-center">
        <Button type="submit" className="rounded-md px-16">
          Sign up
        </Button>
      </div>

      <p className="pt-2 text-center text-lg text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
