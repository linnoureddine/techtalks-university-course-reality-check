import { NextRequest, NextResponse } from "next/server";
import pool from "@/db";

/**
 * GET /api/courses/[slug]
 *
 * Returns a single course's full details for the course detail page.
 * Slug format: course code lowercased with spaces → hyphens
 * e.g. "CMPS 214" → "cmps-214"
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    // Reverse slug → DB code: "cmps-214" → "CMPS 214"
    const code = slug.replace(/-/g, " ").toUpperCase();

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
        d.name           AS department,
        d.department_id,
        u.name           AS university,
        u.university_id,

        COUNT(r.review_id)            AS reviewCount,
        AVG(r.overall_rating)         AS avgOverall,
        AVG(r.exam_difficulty_rating) AS avgExam,
        AVG(r.workload_rating)        AS avgWorkload,
        AVG(r.attendance_rating)      AS avgAttendance,
        AVG(r.grading_rating)         AS avgGrading

      FROM course c
      INNER JOIN department d ON d.department_id = c.department_id
      INNER JOIN university u ON u.university_id  = d.university_id
      LEFT JOIN review r
        ON r.course_id   = c.course_id
        AND r.deleted_at IS NULL

      WHERE UPPER(c.code) = ? AND c.deleted_at IS NULL

      GROUP BY
        c.course_id, c.code, c.title, c.description,
        c.credits, c.level, c.language,
        d.name, d.department_id, u.name, u.university_id
      `,
      [code],
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    const row = rows[0];

    // Fetch prerequisites
    const [prereqs]: any = await pool.query(
      `SELECT c.course_id, c.code, c.title
       FROM course_prerequisite cp
       JOIN course c ON c.course_id = cp.prereq_course_id
       WHERE cp.course_id = ? AND c.deleted_at IS NULL`,
      [row.course_id],
    );

    return NextResponse.json({
      success: true,
      course: {
        courseId: row.course_id,
        slug,
        code: row.code,
        title: row.title,
        description: row.description,
        credits: `${row.credits} cr.`,
        level: row.level.charAt(0).toUpperCase() + row.level.slice(1),
        language: row.language,
        department: row.department,
        departmentId: row.department_id,
        university: row.university,
        universityId: row.university_id,
        reviewCount: Number(row.reviewCount) || 0,
        averageRating:
          row.avgOverall === null
            ? null
            : Number(Number(row.avgOverall).toFixed(2)),
        ratings: {
          exam:
            row.avgExam === null
              ? null
              : Number(Number(row.avgExam).toFixed(2)),
          workload:
            row.avgWorkload === null
              ? null
              : Number(Number(row.avgWorkload).toFixed(2)),
          attendance:
            row.avgAttendance === null
              ? null
              : Number(Number(row.avgAttendance).toFixed(2)),
          grading:
            row.avgGrading === null
              ? null
              : Number(Number(row.avgGrading).toFixed(2)),
        },
        prerequisites: prereqs,
      },
    });
  } catch (error: any) {
    console.error("GET COURSE BY SLUG ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
