import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all scheduled appointments
router.get('/appointments', (req, res) => {
    const sql = 'SELECT * FROM appointments ORDER BY scheduledDate, appointmentTime';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new appointment
router.post('/appointments', (req, res) => {
    const { fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note } = req.body;
    const sql = `INSERT INTO appointments (fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Appointment scheduled successfully', id: result.insertId });
    });
});

export default router;