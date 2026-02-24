import { NextResponse } from "next/server";
import pool from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rating = body?.rating;
    const message = body?.message;

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "message must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Validate rating
    let normalizedRating: number | null = null;
    if (rating !== undefined && rating !== null) {
      const r = Number(rating);
      if (!Number.isInteger(r) || r < 1 || r > 5) {
        return NextResponse.json(
          { success: false, message: "rating must be an integer between 1 and 5" },
          { status: 400 }
        );
      }
      normalizedRating = r;
    }

    const [result]: any = await pool.query(
      "INSERT INTO feedback (rating, message, user_id) VALUES (?, ?, NULL)",
      [normalizedRating, message.trim()]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted",
        feedbackId: result.insertId
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("FEEDBACK POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}