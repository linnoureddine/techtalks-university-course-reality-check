import { NextResponse } from "next/server";
import pool from "@/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      "SELECT university_id, name FROM university"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("UNIVERSITIES ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch universities" },
      { status: 500 }
    );
  }
}