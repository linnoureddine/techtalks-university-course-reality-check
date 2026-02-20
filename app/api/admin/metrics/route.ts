//admin dashboard
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

type MetricsResponse = {
  totalUsers: number;
  totalCourses: number;
  totalReviews: number;
  averageRating: number; 
};

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

 
    const [rows]: any = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM user)   AS totalUsers,
        (SELECT COUNT(*) FROM course) AS totalCourses,
        (SELECT COUNT(*) FROM review) AS totalReviews,
        COALESCE(ROUND(AVG(r.overall_rating), 1), 0) AS averageRating
      FROM review r;
    `);

 
    const row = rows?.[0] || {
      totalUsers: 0,
      totalCourses: 0,
      totalReviews: 0,
      averageRating: 0,
    };

    const payload: MetricsResponse = {
      totalUsers: Number(row.totalUsers || 0),
      totalCourses: Number(row.totalCourses || 0),
      totalReviews: Number(row.totalReviews || 0),
      averageRating: Number(row.averageRating || 0),
    };

    return NextResponse.json(payload);
  } catch (error: any) {
    return NextResponse.json(
      { message: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}