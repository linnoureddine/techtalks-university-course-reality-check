import { NextResponse } from "next/server";
import pool from "@/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const query = (url.searchParams.get("query") || "").trim();
    const limit = Math.min(Number(url.searchParams.get("limit") || 10), 50);

    if (!query) {
      return NextResponse.json(
        { success: false, message: "query is required (ex: /api/search?query=cs)" },
        { status: 400 }
      );
    }

    const like = `%${query}%`;

    const [rows]: any = await pool.query(
      `
      SELECT
        c.course_id,
        c.code,
        c.title,
        d.name AS department,
        u.name AS university
      FROM course c
      INNER JOIN department d ON d.department_id = c.department_id
      INNER JOIN university u ON u.university_id = d.university_id
      WHERE
        c.code LIKE ?
        OR c.title LIKE ?
        OR d.name LIKE ?
        OR u.name LIKE ?
      ORDER BY
        -- Put "code match" first, then title match
        (c.code LIKE ?) DESC,
        (c.title LIKE ?) DESC,
        c.course_id DESC
      LIMIT ?
      `,
      [like, like, like, like, like, like, limit]
    );

    const results = rows.map((r: any) => ({
      courseId: r.course_id,
      code: r.code,
      title: r.title,
      university: r.university,
      department: r.department
    }));

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results
    });
  } catch (error: any) {
    console.error("SEARCH ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to search" },
      { status: 500 }
    );
  }
}
