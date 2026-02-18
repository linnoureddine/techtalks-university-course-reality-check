"use client";

import { Users, BookOpen, Star, TrendingUp } from "lucide-react";
import UserGrowthChart from "@/components/admin/charts/UserGrowthChart";
import ReviewTrendChart from "@/components/admin/charts/ReviewTrendChart";
import RatingsDistributionChart from "@/components/admin/charts/RatingsDistributionChart";

export default function AdminDashboardPage() {
  const stats = [
    {
      value: "1,248",
      label: "Total Users",
      Icon: Users,
      iconBg: "bg-[#E8F1FF]",
      iconColor: "text-[#2F80ED]",
    },
    {
      value: "248",
      label: "Total Courses",
      Icon: BookOpen,
      iconBg: "bg-[#FFE9EE]",
      iconColor: "text-[#EB5757]",
    },
    {
      value: "3,842",
      label: "Total Reviews",
      Icon: Star,
      iconBg: "bg-[#FFF6D9]",
      iconColor: "text-[#F2C94C]",
    },
    {
      value: "4.6",
      label: "Average Rating",
      Icon: TrendingUp,
      iconBg: "bg-[#E8F7EA]",
      iconColor: "text-[#27AE60]",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Overview</h1>
      <p className="mt-1 text-sm text-gray-500">
        Welcome Back! Here&apos;s what&apos;s happening with your platform
        today.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ value, label, Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-300 bg-white p-4"
          >
            <div
              className={`h-10 w-10 rounded-lg ${iconBg} flex items-center justify-center`}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>

            <div className="mt-3 text-lg font-semibold text-black">{value}</div>
            <div className="text-xs text-gray-700">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UserGrowthChart />
        <ReviewTrendChart />
        <RatingsDistributionChart />
      </div>
    </div>
  );
}
