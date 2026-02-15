import { NextResponse } from "next/server";
import pool from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body?.email;
    const password = body?.password;

    // 1) Validation
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

    // 2) Find user by email
    const [rows]: any = await pool.query(
      "SELECT user_id, full_name, email, password, role FROM `user` WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 3) Compare password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4) Generate JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server misconfigured: JWT_SECRET missing" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        role: user.role
      },
      secret,
      { expiresIn: "2h" }
    );

    // 5) Return token + user
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}
