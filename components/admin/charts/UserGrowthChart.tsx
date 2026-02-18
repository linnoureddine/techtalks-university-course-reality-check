"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const chartData = [
  { date: "Feb 12", users: 40 },
  { date: "Feb 13", users: 55 },
  { date: "Feb 14", users: 48 },
  { date: "Feb 15", users: 70 },
  { date: "Feb 16", users: 66 },
  { date: "Feb 17", users: 90 },
];

export default function UserGrowthChart() {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-gray-700">User Growth</h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={false}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#111827" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 5, fill: "#6155F5", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: "#6155F5",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
