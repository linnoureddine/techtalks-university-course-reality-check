import { NextResponse } from "next/server";
import pool from "@/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") || 8), 20);

    const [rows]: any = await pool.query(
      `
      SELECT
        feedback_id,
        message,
        user_id,
        rating,
        created_at
      FROM feedback
      WHERE message IS NOT NULL AND message <> ''
      ORDER BY created_at DESC
      LIMIT ?
      `,
      [limit]
    );

    const testimonials = rows.map((r: any) => ({
      feedbackId: r.feedback_id,
      text: r.message,
      username: r.user_id ? `student#${r.user_id}` : "anonymous",
      rating: r.rating ?? 0,
      createdAt: r.created_at,
    }));

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error: any) {
    console.error("TESTIMONIALS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}