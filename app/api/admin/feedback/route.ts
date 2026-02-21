import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

/**
 * GET /api/admin/feedback
 *
 * Returns all feedback submissions with submitter info.
 *
 * Pagination is intentionally omitted — the frontend computes stat card values
 * (avg rating, positive count, negative count) from the full list in memory,
 * so we must return all rows for those numbers to be accurate.
 *
 * Sorting and search are handled here to keep the SQL efficient.
 * Sentiment filtering (positive / neutral / negative) is handled on the
 * frontend via useMemo, matching how the page is built.
 *
 * Query params:
 *   q     — search across full_name, email, message
 *   sort  — newest | oldest | rating_high | rating_low  (default: newest)
 *
 * Response shape matches the FeedbackRow type in the frontend exactly:
 * {
 *   feedback_id, user_id, full_name, email, rating, message, created_at
 * }
 */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const sort = (searchParams.get("sort") || "newest").trim();

    const conditions: string[] = [];
    const params: any[] = [];

    if (q) {
      conditions.push(
        "(u.full_name LIKE ? OR u.email LIKE ? OR f.message LIKE ?)",
      );
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const sortClause: Record<string, string> = {
      newest: "f.created_at DESC",
      oldest: "f.created_at ASC",
      rating_high: "f.rating DESC",
      rating_low: "f.rating ASC",
    };
    const orderBy = sortClause[sort] ?? "f.created_at DESC";

    const [rows]: any = await pool.query(
      `SELECT
        f.feedback_id,
        u.user_id,
        u.full_name,
        u.email,
        f.rating,
        f.message,
        DATE_FORMAT(f.created_at, '%Y-%m-%d') AS created_at
        FROM feedback f
        JOIN \`user\` u ON u.user_id = f.user_id
        ${where}
        ORDER BY ${orderBy}`,
      params,
    );

    return NextResponse.json({
      success: true,
      feedback: rows,
    });
  } catch (error: any) {
    console.error("GET FEEDBACK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}
