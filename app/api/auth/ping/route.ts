import { NextResponse } from "next/server";
import pool from "@/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      "SELECT user_id, email FROM `user` LIMIT 1"
    );

    return NextResponse.json({
      success: true,
      message: "Auth DB connection successful",
      sampleUser: rows.length > 0 ? rows[0] : null,
    });
  } catch (error: any) {
    console.error("AUTH DB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Auth DB connection failed",
        error: error?.message || String(error),
        code: error?.code,
      },
      { status: 500 }
    );
  }
}
