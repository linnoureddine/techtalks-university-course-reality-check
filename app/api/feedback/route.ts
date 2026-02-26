import { NextResponse } from "next/server";
import pool from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rating = Number(body?.rating);
    const message = body?.message;

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "message must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Validate rating (1..5)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "rating must be an integer between 1 and 5" },
        { status: 400 }
      );
    }

    // anonymous feedback => user_id = NULL (requires DB to allow NULL)
    const [result]: any = await pool.query(
      "INSERT INTO feedback (rating, message, user_id) VALUES (?, ?, ?)",
      [rating, message.trim(), null]
    );

    return NextResponse.json(
      { success: true, message: "Feedback submitted", feedbackId: result.insertId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("FEEDBACK POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit feedback" },
      { status: 500 }
    );
  }
}