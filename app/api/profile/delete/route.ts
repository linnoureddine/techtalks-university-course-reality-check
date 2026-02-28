import { NextResponse } from "next/server";
import pool from "@/db";
import { requireAuth } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const user = requireAuth(req);

    await pool.query(
      "DELETE FROM `user` WHERE user_id = ?",
      [user.userId],
    );

    const response = NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

    response.cookies.set("auth_token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
}