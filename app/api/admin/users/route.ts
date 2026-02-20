import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import pool from "@/db";
import bcrypt from "bcryptjs";

//display users (admin: user management table)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 10)));
    const q = (searchParams.get("q") || "").trim();

    const offset = (page - 1) * limit;

    let where = "";
    const params: any[] = [];

    if (q) {
      where = `WHERE u.full_name LIKE ? OR u.email LIKE ?`;
      params.push(`%${q}%`, `%${q}%`);
    }

    // Total count
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) AS total FROM user u ${where}`,
      params
    );

    const total = countRows[0].total;

    // Data query
    const [rows]: any = await pool.query(
      `
      SELECT 
        u.user_id,
        u.full_name,
        u.email,
        u.role,
        u.created_at,
        uni.name AS university_name
      FROM user u
      LEFT JOIN university uni 
        ON uni.university_id = u.university_id
      ${where}
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    const users = rows.map((user: any) => ({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      university: user.university_name,
      role: user.role,
      joined: user.created_at,
      isProtected: user.role === "admin"
    }));

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}

//add admin (user management)
export async function POST(req: Request) {
  try {
    await requireAdmin(req);

    const body = await req.json();
    const fullName = body?.fullName;
    const email = body?.email;
    const password = body?.password;

    if (!fullName || typeof fullName !== "string") {
      return NextResponse.json(
        { success: false, message: "fullName is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "email is required" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "password is required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "email must be valid" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if email exists
    const [existing]: any = await pool.query(
      "SELECT user_id FROM `user` WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert as ADMIN
    const [result]: any = await pool.query(
      "INSERT INTO `user` (full_name, email, password, role) VALUES (?, ?, ?, ?)",
      [fullName, email, hashedPassword, "admin"]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        user: {
          id: result.insertId,
          name: fullName,
          email,
          role: "admin"
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}