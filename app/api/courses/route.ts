import { NextResponse } from "next/server";
import pool from "@/db";

//get courses (home page)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const limit = Math.min(Number(url.searchParams.get("limit") || 10), 50);
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const offset = (page - 1) * limit;

    const [rows]: any = await pool.query(
      `
      SELECT
        c.course_id,
        c.code,
        c.title,
        c.description,
        c.credits,
        c.level,
        c.language,
        d.name AS department,
        u.name AS university,

        COUNT(r.review_id) AS reviewCount,

        AVG(r.overall_rating) AS avgOverall,
        AVG(r.exam_difficulty_rating) AS avgExam,
        AVG(r.workload_rating) AS avgWorkload,
        AVG(r.attendance_rating) AS avgAttendance,
        AVG(r.grading_rating) AS avgGrading

      FROM course c
      INNER JOIN department d ON d.department_id = c.department_id
      INNER JOIN university u ON u.university_id = d.university_id
      LEFT JOIN review r ON r.course_id = c.course_id

      GROUP BY c.course_id
      ORDER BY reviewCount DESC, c.course_id DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset],
    );

    const data = rows.map((row: any) => ({
      courseId: row.course_id,
      code: row.code,
      title: row.title,
      description: row.description,
      credits: row.credits,
      level: row.level,
      language: row.language,
      university: row.university,
      department: row.department,
      reviewCount: Number(row.reviewCount) || 0,
      averageRating:
        row.avgOverall === null
          ? null
          : Number(Number(row.avgOverall).toFixed(1)),
      ratings: {
        exam:
          row.avgExam === null ? null : Number(Number(row.avgExam).toFixed(1)),
        workload:
          row.avgWorkload === null
            ? null
            : Number(Number(row.avgWorkload).toFixed(1)),
        attendance:
          row.avgAttendance === null
            ? null
            : Number(Number(row.avgAttendance).toFixed(1)),
        grading:
          row.avgGrading === null
            ? null
            : Number(Number(row.avgGrading).toFixed(1)),
      },
    }));

    return NextResponse.json({
      success: true,
      page,
      limit,
      count: data.length,
      courses: data,
    });
  } catch (error: any) {
    console.error("COURSES GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
