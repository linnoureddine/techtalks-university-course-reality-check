// Handles API admin courses id requests.
import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { requireAdmin, requireUniversityAdmin } from "@/lib/auth";
import pool from "@/db";
import { normalizeCourseDescription } from "@/lib/courseDescriptionText";
import {
  ensureCourseVideoColumns,
  normalizeOptionalVideoTitle,
  normalizeOptionalVideoUrl,
} from "@/lib/courseVideosDb";
import { COURSE_LEVEL_VALUES } from "@/lib/courseLevels";
import { ensureReviewHiddenColumn } from "@/lib/reviewDb";

// Full course payload returned by the joined admin detail query.
type CourseDetailRow = RowDataPacket & {
  course_id: number;
  code: string;
  title: string;
  description: string;
  video_url: string | null;
  video_title: string | null;
  credits: number;
  level: string;
  language: string;
  department_id: number;
  department: string;
  university_id: number;
  university: string;
  deleted_at: Date | string | null;
  rating: number | string;
  number_of_reviews: number | string;
  exam: number | string;
  workload: number | string;
  attendance: number | string;
  grading: number | string;
};

// Minimal row used when we only need to prove a course exists.
type CourseIdRow = RowDataPacket & {
  course_id: number;
  university_id: number;
};

// Prerequisite courses are fetched separately so the response can include a list.
type PrerequisiteRow = RowDataPacket & {
  course_id: number;
  code: string;
  title: string;
};

// Minimal row used to validate a department before moving a course to it.
type DepartmentIdRow = RowDataPacket & {
  department_id: number;
  university_id: number;
};

type PrerequisiteValidationRow = RowDataPacket & {
  course_id: number;
  code: string;
  title: string;
  university_id: number;
};

function normalizePrerequisiteIds(value: unknown) {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    throw new Error("prerequisite_course_ids must be an array");
  }

  const ids = value.map((rawId) => Number(rawId));
  if (ids.some((id) => !Number.isInteger(id) || id <= 0)) {
    throw new Error("prerequisite_course_ids must contain valid course IDs");
  }

  return Array.from(new Set(ids));
}

/**
 * GET /api/admin/courses/[id]
 *
 * Returns a single course with the full Course shape (including nested metrics)
 * plus its prerequisites list.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Any admin can view course details in the admin dashboard.
    await requireAdmin(req);
    await ensureReviewHiddenColumn();
    await ensureCourseVideoColumns();

    // Dynamic route params arrive as strings, so convert and validate early.
    const { id } = await params;
    const courseId = parseInt(id, 10);

    if (isNaN(courseId) || courseId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 },
      );
    }

    // Load the course, its university/department labels, and review averages in one query.
    const [rows] = await pool.query<CourseDetailRow[]>(
      `SELECT
        c.course_id,
        c.code,
        c.title,
        c.description,
        c.video_url,
        c.video_title,
        c.credits,
        c.level,
        c.language,
        c.department_id,
        d.name                                                AS department,
        uni.university_id,
        uni.name                                              AS university,
        c.deleted_at,
        COALESCE(ROUND(AVG(r.overall_rating),         2), 0) AS rating,
        COUNT(r.review_id)                                    AS number_of_reviews,
        COALESCE(ROUND(AVG(r.exam_difficulty_rating), 2), 0) AS exam,
        COALESCE(ROUND(AVG(r.workload_rating),        2), 0) AS workload,
        COALESCE(ROUND(AVG(r.attendance_rating),      2), 0) AS attendance,
        COALESCE(ROUND(AVG(r.grading_rating),         2), 0) AS grading
      FROM course c
      JOIN department  d   ON d.department_id   = c.department_id
      JOIN university  uni ON uni.university_id  = d.university_id
      LEFT JOIN review r
        ON r.course_id = c.course_id
        AND r.deleted_at IS NULL
        AND r.hidden_at IS NULL
      WHERE c.course_id = ?
      GROUP BY
        c.course_id, c.code, c.title, c.description, c.credits,
        c.video_url, c.video_title, c.level, c.language, c.department_id, d.name,
        uni.university_id, uni.name, c.deleted_at`,
      [courseId],
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    const row = rows[0];

    // Fetch active prerequisite courses separately because they are one-to-many.
    const [prereqs] = await pool.query<PrerequisiteRow[]>(
      `SELECT c.course_id, c.code, c.title
        FROM course_prerequisite cp
        JOIN course c ON c.course_id = cp.prereq_course_id
        WHERE cp.course_id = ? AND c.deleted_at IS NULL`,
      [courseId],
    );

    // Normalize MySQL numeric aggregates into plain JavaScript numbers for the UI.
    const course = {
      course_id: row.course_id,
      code: row.code,
      title: row.title,
      description: normalizeCourseDescription(row),
      videoUrl: row.video_url ?? null,
      videoTitle: row.video_title ?? null,
      credits: row.credits,
      level: row.level,
      language: row.language,
      department_id: row.department_id,
      department: row.department,
      university_id: row.university_id,
      university: row.university,
      deleted_at: row.deleted_at,
      rating: Number(row.rating),
      number_of_reviews: Number(row.number_of_reviews),
      metrics: {
        exam: Number(row.exam),
        workload: Number(row.workload),
        attendance: Number(row.attendance),
        grading: Number(row.grading),
      },
      prerequisites: prereqs,
    };

    return NextResponse.json({ success: true, course });
  } catch (error: unknown) {
    console.error("GET COURSE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}

/**
 * PATCH /api/admin/courses/[id]
 *
 * Partially updates a course. Only fields present in the body are updated.
 * Course `code` is intentionally not patchable - changing a code breaks
 * existing references. Delete and recreate instead.
 *
 * Body (all optional): {
 *   title, description, credits, language, level, department_id
 * }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Only University Admins can mutate course records.
    await requireUniversityAdmin(req);
    await ensureCourseVideoColumns();

    // Validate the route id before touching the database.
    const { id } = await params;
    const courseId = parseInt(id, 10);

    if (isNaN(courseId) || courseId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 },
      );
    }

    // Confirm the course exists and is not already soft-deleted.
    const [existing] = await pool.query<CourseIdRow[]>(
      `SELECT c.course_id, d.university_id
      FROM course c
      JOIN department d ON d.department_id = c.department_id
      WHERE c.course_id = ?
        AND c.deleted_at IS NULL
      LIMIT 1`,
      [courseId],
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { title, description, credits, language, level, department_id } = body;
    const videoUrlInput = body.video_url ?? body.videoUrl;
    const videoTitleInput = body.video_title ?? body.videoTitle;
    const prerequisitesProvided =
      Object.prototype.hasOwnProperty.call(body, "prerequisite_course_ids") ||
      Object.prototype.hasOwnProperty.call(body, "prerequisiteCourseIds");
    let prerequisiteCourseIds: number[] | null = null;
    let selectedPrerequisites: PrerequisiteValidationRow[] = [];

    // Build the UPDATE statement only from fields that were actually provided.
    const setClauses: string[] = [];
    const values: Array<string | number | null> = [];
    let targetUniversityId = existing[0].university_id;

    if (prerequisitesProvided) {
      try {
        prerequisiteCourseIds = normalizePrerequisiteIds(
          body.prerequisite_course_ids ?? body.prerequisiteCourseIds,
        );
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message:
              error instanceof Error
                ? error.message
                : "Invalid prerequisite courses",
          },
          { status: 400 },
        );
      }
    }

    // Validate and queue a title update when the request includes one.
    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return NextResponse.json(
          { success: false, message: "title must be a non-empty string" },
          { status: 400 },
        );
      }
      setClauses.push("title = ?");
      values.push(title.trim());
    }

    // Validate and queue a description update when the request includes one.
    if (description !== undefined) {
      if (typeof description !== "string" || !description.trim()) {
        return NextResponse.json(
          { success: false, message: "description must be a non-empty string" },
          { status: 400 },
        );
      }
      setClauses.push("description = ?");
      values.push(description.trim());
    }

    if (videoUrlInput !== undefined) {
      let cleanVideoUrl: string | null;
      try {
        cleanVideoUrl = normalizeOptionalVideoUrl(videoUrlInput);
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message:
              error instanceof Error ? error.message : "Invalid course video URL",
          },
          { status: 400 },
        );
      }
      setClauses.push("video_url = ?");
      values.push(cleanVideoUrl);
    }

    if (videoTitleInput !== undefined) {
      let cleanVideoTitle: string | null;
      try {
        cleanVideoTitle = normalizeOptionalVideoTitle(videoTitleInput);
      } catch (error) {
        return NextResponse.json(
          {
            success: false,
            message:
              error instanceof Error
                ? error.message
                : "Invalid course video title",
          },
          { status: 400 },
        );
      }
      setClauses.push("video_title = ?");
      values.push(cleanVideoTitle);
    }

    // Credits are limited to the schema's realistic 1-9 range.
    if (credits !== undefined) {
      const c = Number(credits);
      if (isNaN(c) || c < 1 || c > 9) {
        return NextResponse.json(
          { success: false, message: "credits must be between 1 and 9" },
          { status: 400 },
        );
      }
      setClauses.push("credits = ?");
      values.push(c);
    }

    // Keep languages aligned with the database enum.
    const validLanguages = [
      "English",
      "Arabic",
      "French",
      "German",
      "Spanish",
      "Other",
    ];
    if (language !== undefined) {
      if (!validLanguages.includes(language)) {
        return NextResponse.json(
          {
            success: false,
            message: `language must be one of: ${validLanguages.join(", ")}`,
          },
          { status: 400 },
        );
      }
      setClauses.push("language = ?");
      values.push(language);
    }

    // Keep levels aligned with the shared course-level constants.
    const validLevels = COURSE_LEVEL_VALUES;
    if (level !== undefined) {
      if (!validLevels.includes(level)) {
        return NextResponse.json(
          {
            success: false,
            message: `level must be one of: ${validLevels.join(", ")}`,
          },
          { status: 400 },
        );
      }
      setClauses.push("level = ?");
      values.push(level);
    }

    // If the department changes, verify the target department exists and is active.
    if (department_id !== undefined) {
      const deptId = Number(department_id);
      if (isNaN(deptId)) {
        return NextResponse.json(
          { success: false, message: "department_id must be a number" },
          { status: 400 },
        );
      }
      const [deptRows] = await pool.query<DepartmentIdRow[]>(
        `SELECT d.department_id, d.university_id
        FROM department d
        JOIN university u ON u.university_id = d.university_id
        WHERE d.department_id = ?
          AND d.is_active = 1
          AND u.is_active = 1
        LIMIT 1`,
        [deptId],
      );
      if (!deptRows || deptRows.length === 0) {
        return NextResponse.json(
          { success: false, message: "Department not found" },
          { status: 404 },
        );
      }
      setClauses.push("department_id = ?");
      values.push(deptId);
      targetUniversityId = deptRows[0].university_id;
    }

    if (prerequisiteCourseIds !== null) {
      if (prerequisiteCourseIds.includes(courseId)) {
        return NextResponse.json(
          {
            success: false,
            message: "A course cannot be its own prerequisite",
          },
          { status: 400 },
        );
      }

      if (prerequisiteCourseIds.length > 0) {
        const placeholders = prerequisiteCourseIds.map(() => "?").join(", ");
        const [prereqRows] = await pool.query<PrerequisiteValidationRow[]>(
          `SELECT
            c.course_id,
            c.code,
            c.title,
            d.university_id
          FROM course c
          JOIN department d ON d.department_id = c.department_id
          JOIN university u ON u.university_id = d.university_id
          WHERE c.course_id IN (${placeholders})
            AND c.deleted_at IS NULL
            AND d.is_active = 1
            AND u.is_active = 1`,
          prerequisiteCourseIds,
        );

        if (prereqRows.length !== prerequisiteCourseIds.length) {
          return NextResponse.json(
            {
              success: false,
              message: "One or more prerequisite courses were not found",
            },
            { status: 400 },
          );
        }

        const invalidUniversity = prereqRows.find(
          (row) => row.university_id !== targetUniversityId,
        );
        if (invalidUniversity) {
          return NextResponse.json(
            {
              success: false,
              message: "Prerequisite courses must belong to the same university",
            },
            { status: 400 },
          );
        }

        const prerequisiteById = new Map(
          prereqRows.map((row) => [row.course_id, row] as const),
        );
        selectedPrerequisites = prerequisiteCourseIds
          .map((prereqId) => prerequisiteById.get(prereqId))
          .filter((row): row is PrerequisiteValidationRow => Boolean(row));
      }
    }

    // Avoid running an empty UPDATE when the request body had no supported fields.
    if (setClauses.length === 0 && prerequisiteCourseIds === null) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided to update" },
        { status: 400 },
      );
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      if (setClauses.length > 0) {
        // Append the route id last because it belongs to the WHERE clause.
        values.push(courseId);
        await connection.query(
          `UPDATE course SET ${setClauses.join(", ")} WHERE course_id = ?`,
          values,
        );
      }

      if (prerequisiteCourseIds !== null) {
        await connection.query(
          "DELETE FROM course_prerequisite WHERE course_id = ?",
          [courseId],
        );

        if (prerequisiteCourseIds.length > 0) {
          const valuesSql = prerequisiteCourseIds.map(() => "(?, ?)").join(", ");
          const prerequisiteValues = prerequisiteCourseIds.flatMap(
            (prereqCourseId) => [courseId, prereqCourseId],
          );

          await connection.query(
            `INSERT IGNORE INTO course_prerequisite
              (course_id, prereq_course_id)
            VALUES ${valuesSql}`,
            prerequisiteValues,
          );
        }
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      course: {
        course_id: courseId,
        prerequisites:
          prerequisiteCourseIds === null
            ? undefined
            : selectedPrerequisites.map((row) => ({
                course_id: row.course_id,
                code: row.code,
                title: row.title,
              })),
      },
    });
  } catch (error: unknown) {
    console.error("PATCH COURSE ERROR:", error);
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json(
        { success: false, message: "You are not the University Admin" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}

/**
 * DELETE /api/admin/courses/[id]
 *
 * Soft-deletes a course by setting deleted_at = NOW().
 * Reviews and prerequisites are preserved for historical reference.
 * The frontend marks the row as "Deleted" with opacity-50 styling.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Only University Admins can remove courses from the visible catalog.
    await requireUniversityAdmin(req);

    // Validate the route id before looking up the course.
    const { id } = await params;
    const courseId = parseInt(id, 10);

    if (isNaN(courseId) || courseId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 },
      );
    }

    // Only active courses can be deleted; deleted courses should return 404 here.
    const [rows] = await pool.query<CourseIdRow[]>(
      "SELECT course_id FROM course WHERE course_id = ? AND deleted_at IS NULL LIMIT 1",
      [courseId],
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    // Soft delete preserves reviews, votes, and historical references.
    await pool.query(
      "UPDATE course SET deleted_at = NOW() WHERE course_id = ?",
      [courseId],
    );

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error: unknown) {
    console.error("DELETE COURSE ERROR:", error);
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json(
        { success: false, message: "You are not the University Admin" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, message: "UNAUTHORIZED" },
      { status: 401 },
    );
  }
}
