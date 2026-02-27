import { NextResponse } from "next/server";
import pool from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = body?.fullName;
    const email = body?.email;
    const password = body?.password;
    const universityId = body?.universityId;

    if (!fullName || typeof fullName !== "string") {
      return NextResponse.json(
        { success: false, message: "fullName is required" },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "email is required" },
        { status: 400 },
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "password is required" },
        { status: 400 },
      );
    }

    if (!universityId || typeof universityId !== "number") {
      return NextResponse.json(
        { success: false, message: "Valid universityId is required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least one number",
        },
        { status: 400 },
      );
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least one special character",
        },
        { status: 400 },
      );
    }

    const [existing]: any = await pool.query(
      "SELECT user_id FROM `user` WHERE email = ? LIMIT 1",
      [email],
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 },
      );
    }

    const [uni]: any = await pool.query(
      "SELECT university_id FROM university WHERE university_id = ? LIMIT 1",
      [universityId],
    );

    if (uni.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid university selected" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await pool.query(
      "INSERT INTO `user` (full_name, email, password, role, university_id) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, hashedPassword, "student", universityId],
    );

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: result.insertId,
          fullName,
          email,
          universityId,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Signup failed", error: error?.message },
      { status: 500 },
    );
  }
}
