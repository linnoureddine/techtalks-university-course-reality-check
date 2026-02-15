"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-6 pt-32">
      <div className="w-full max-w-[420px] rounded-xl bg-white border border-gray-200 shadow-lg px-6 py-6">
        {success ? (
          <>
            <h1 className="text-center text-2xl font-semibold text-[#111827]">
              Check Your Email
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              If an account exists for
            </p>

            <p className="text-center text-sm font-medium text-[#111827] mt-1">
              {email}
            </p>

            <p className="mt-2 text-center text-sm text-gray-500">
              You’ll receive a password reset link shortly.
            </p>

            <div className="mt-5">
              <Link
                href="/login"
                className="block text-center text-sm text-[#6155F5] hover:underline"
              >
                Back to login
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-semibold text-[#111827]">
              Forgot your password?
            </h1>

            <p className="mt-1 text-center text-sm text-gray-500">
              Enter your email to receive a password reset link.
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

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#6155F5] text-white text-sm font-medium shadow-md hover:bg-[#503fdc] active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#6155F5] transition"
                >
                  <span>
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                  Back to login
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
