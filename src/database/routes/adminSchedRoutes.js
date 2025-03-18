import express from "express";
import db from "../db.js";

const router = express.Router();

// Correct the route to be just '/'
router.get('/schedule', (req, res) => {
    const sql = 'SELECT * FROM schedule ORDER BY scheduledDate, appointmentTime';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching schedule:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Correct the POST route to handle /schedule
router.post('/schedule', (req, res) => {
    console.log('Received appointment data:', req.body);

    const { fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor } = req.body;

    // Validate required fields
    if (!fullName || !birthday || !sex || !scheduledDate || !appointmentTime || !procedureName || !doctor) {
        console.error('Missing required fields:', { fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, doctor });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO schedule (fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor];
    console.log('Executing SQL with values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Appointment created successfully:', result);
        res.status(201).json({ message: 'Appointment scheduled successfully', id: result.insertId });
    });
});


export default router;