const db = require("../db");

exports.getAllCourses = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM course");
  res.json(rows);
};

exports.getCourseById = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id]
  );
  res.json(rows[0]);
};

exports.createCourse = async (req, res) => {
  const { title, description, instructor, duration } = req.body;

  await db.query(
    "INSERT INTO courses (title, description, instructor, duration) VALUES (?, ?, ?, ?)",
    [title, description, instructor, duration]
  );

  res.json({ message: "Course created" });
};

exports.updateCourse = async (req, res) => {
  const { title, description, instructor, duration } = req.body;

  await db.query(
    "UPDATE courses SET title=?, description=?, instructor=?, duration=? WHERE id=?",
    [title, description, instructor, duration, req.params.id]
  );

  res.json({ message: "Course updated" });
};

exports.deleteCourse = async (req, res) => {
  await db.query(
    "DELETE FROM courses WHERE id=?",
    [req.params.id]
  );

  res.json({ message: "Course deleted" });
};
