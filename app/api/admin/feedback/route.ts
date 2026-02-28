import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const sort = (searchParams.get("sort") || "newest").trim();

    const conditions: string[] = [];
    const params: any[] = [];

    if (q) {
      conditions.push("(u.full_name LIKE ? OR u.email LIKE ? OR f.message LIKE ?)");
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

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
        COALESCE(u.user_id, '') AS user_id,
        COALESCE(u.full_name, 'anonymous') AS full_name,
        COALESCE(u.email, '') AS email,
        f.rating,
        f.message,
        DATE_FORMAT(f.created_at, '%Y-%m-%d') AS created_at
      FROM feedback f
      LEFT JOIN \`user\` u ON u.user_id = f.user_id
      ${where}
      ORDER BY ${orderBy}`,
      params
    );

    return NextResponse.json({
      success: true,
      feedback: rows,
    });
  } catch (error: any) {
    console.error("GET FEEDBACK ERROR:", error);
    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}