import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin: any = await requireAdmin(req);

    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id, 10);

    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Check if user exists
    const [users]: any = await pool.query(
      "SELECT user_id, role FROM user WHERE user_id = ?",
      [userId]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const targetUser = users[0];

    // Prevent deleting yourself
    if (currentAdmin.user_id === userId) {
      return NextResponse.json(
        { message: "You cannot delete yourself" },
        { status: 400 }
      );
    }

    // Prevent deleting last admin
    if (targetUser.role === "admin") {
      const [adminCountRows]: any = await pool.query(
        "SELECT COUNT(*) AS total FROM user WHERE role = 'admin'"
      );

      const adminCount = adminCountRows[0].total;

      if (adminCount <= 1) {
        return NextResponse.json(
          { message: "Cannot delete the last remaining admin" },
          { status: 400 }
        );
      }
    }

    // Delete related records first
    await pool.query("DELETE FROM review_vote WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM review WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM feedback WHERE user_id = ?", [userId]);

    // Delete user
    await pool.query("DELETE FROM user WHERE user_id = ?", [userId]);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json(
      { message: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}
