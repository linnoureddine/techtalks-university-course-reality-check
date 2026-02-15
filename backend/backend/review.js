// review.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // your mysql2/promise connection

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM review');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// GET reviews for a specific course
router.get('/course/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM review WHERE course_id = ?',
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// POST a new review
router.post('/', async (req, res) => {
    try {
        const {
            user_id,
            course_id,
            semester_taken,
            review_text,
            instructor_name,
            overall_rating,
            grading_rating,
            workload_rating,
            attendance_rating,
            exam_difficulty_rating
        } = req.body;

        const [result] = await db.query(
            `INSERT INTO review 
            (user_id, course_id, semester_taken, review_text, instructor_name,
             overall_rating, grading_rating, workload_rating, attendance_rating, exam_difficulty_rating)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                course_id,
                semester_taken,
                review_text,
                instructor_name,
                overall_rating,
                grading_rating,
                workload_rating,
                attendance_rating,
                exam_difficulty_rating
            ]
        );

        res.status(201).json({
            review_id: result.insertId,
            user_id,
            course_id,
            semester_taken,
            review_text,
            instructor_name,
            overall_rating,
            grading_rating,
            workload_rating,
            attendance_rating,
            exam_difficulty_rating
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
