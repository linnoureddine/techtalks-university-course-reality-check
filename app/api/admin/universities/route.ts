import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

/**
 * GET /api/admin/universities
 *
 * Returns all active universities ordered alphabetically.
 *
 * Response:
 * {
 *   success: true,
 *   universities: { university_id: number, name: string }[]
 * }
 */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const [rows]: any = await pool.query(
      `SELECT university_id, name
        FROM university
        WHERE is_active = 1
        ORDER BY name ASC`,
    );

    return NextResponse.json({
      success: true,
      universities: rows,
    });
  } catch (error: any) {
    console.error("GET UNIVERSITIES ERROR:", error);
    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}
