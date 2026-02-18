"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const ratingsData = [
  { name: "5★", value: 820, fill: "#2F80ED" },
  { name: "4★", value: 540, fill: "#EB5757" },
  { name: "3★", value: 210, fill: "#F2C94C" },
  { name: "2★", value: 90, fill: "#27AE60" },
  { name: "1★", value: 45, fill: "#6366F1" },
];

export default function MetricsPieChart() {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">
        Rating Distribution
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ratingsData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              paddingAngle={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              formatter={(value?: number, name?: string) => [
                value !== undefined ? `${value}` : "0",
                name ?? "",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
