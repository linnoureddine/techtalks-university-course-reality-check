import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

/**
 * GET /api/admin/universities/[id]/departments
 *
 * Returns all active departments belonging to the given university,
 * ordered alphabetically.
 *
 * Response:
 * {
 *   success: true,
 *   departments: { department_id: number, name: string }[]
 * }
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAdmin(req);

    const { id } = await params;
    const universityId = parseInt(id, 10);

    if (isNaN(universityId) || universityId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid university ID" },
        { status: 400 },
      );
    }

    // Confirm the university exists
    const [uniRows]: any = await pool.query(
      "SELECT university_id FROM university WHERE university_id = ? AND is_active = 1 LIMIT 1",
      [universityId],
    );

    if (!uniRows || uniRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "University not found" },
        { status: 404 },
      );
    }

    const [rows]: any = await pool.query(
      `SELECT department_id, name
        FROM department
        WHERE university_id = ? AND is_active = 1
        ORDER BY name ASC`,
      [universityId],
    );

    return NextResponse.json({
      success: true,
      departments: rows,
    });
  } catch (error: any) {
    console.error("GET DEPARTMENTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}
