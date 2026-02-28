import { NextResponse } from "next/server";
import pool from "@/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      "SELECT university_id, name, email_domain FROM university ORDER BY name ASC",
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("UNIVERSITIES ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load universities" },
      { status: 500 },
    );
  }
}
