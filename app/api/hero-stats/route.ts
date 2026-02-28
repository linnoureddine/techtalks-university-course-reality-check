import { NextResponse } from "next/server";
import pool from "@/db";

export interface HeroStatsResponse {
  universities: number;
  courses: number;
}

export async function GET() {
  try {
    const [[uniRows], [courseRows]] = (await Promise.all([
      pool.query(
        "SELECT COUNT(*) AS count FROM `university` WHERE is_active = 1",
      ),
      pool.query(
        "SELECT COUNT(*) AS count FROM `course` WHERE deleted_at IS NULL",
      ),
    ])) as any;

    const data: HeroStatsResponse = {
      universities: uniRows[0].count,
      courses: courseRows[0].count,
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("[hero-stats] Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
