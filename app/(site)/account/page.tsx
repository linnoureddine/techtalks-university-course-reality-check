"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface Profile {
  full_name: string;
  email: string;
  university_name: string | null;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok) throw new Error("Unauthorized");

        setProfile(data.data);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const res = await fetch("/api/profile/delete", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Account deleted successfully.");

      // 🔥 Full reload to reset auth state everywhere
      window.location.href = "/";
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
        Account Info
      </h1>

      <section className="w-full max-w-md rounded-xl bg-white border border-gray-200 p-6 shadow-lg">
        <h2 className="text-xl font-medium mb-6 text-gray-700">Profile</h2>

        <div className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-600">
            Full Name
            <input
              type="text"
              value={profile.full_name}
              disabled
              className="mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </label>

          <label className="flex flex-col text-gray-600">
            University
            <input
              type="text"
              value={profile.university_name ?? "No university"}
              disabled
              className="mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </label>

          <label className="flex flex-col text-gray-600">
            Email
            <input
              type="email"
              value={profile.email}
              disabled
              className="mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </label>

          <div className="flex gap-3 mt-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => router.push("/forgot-password")}
            >
              Change Password
            </Button>

            <Button
              variant="plain"
              className="flex-1 text-red-600 border border-red-600 hover:bg-red-50 hover:ring-0 focus:ring-0"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}