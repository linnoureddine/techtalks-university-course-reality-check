"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type University = {
  university_id: number;
  name: string;
};

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState<number | "">("");

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //Fetch universities dynamically
  useEffect(() => {
    async function fetchUniversities() {
      try {
        const res = await fetch("/api/universities");
        if (!res.ok) throw new Error("Failed to load universities");
        const data = await res.json();
        setUniversities(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUniversities();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          universityId: universityId || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Signup failed");
        return;
      }

      // Redirect to login
      router.push("/login");

    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {errorMsg && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 text-center">
            {errorMsg}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Full name
          </label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@university.edu"
            autoComplete="email"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            Password
          </label>
          <input
            required
            minLength={6}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          />
        </div>

        {/* University */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#111827]">
            University
          </label>
          <select
            required
            value={universityId}
            onChange={(e) => setUniversityId(Number(e.target.value))}
            className="w-full h-11 rounded-full border border-gray-200 bg-[#EEF4FF] px-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#6155F5]/40"
          >
            <option value="" disabled>
              Select your university
            </option>

            {universities.map((uni) => (
              <option key={uni.university_id} value={uni.university_id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#6155F5] text-white text-sm font-medium shadow-md hover:bg-[#503fdc] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
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