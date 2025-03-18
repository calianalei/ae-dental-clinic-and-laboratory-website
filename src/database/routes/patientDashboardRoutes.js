import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get user's appointments
router.get('/appointments/:userId', (req, res) => {
    const userId = req.params.userId;
    
    // Join with users table to get user details
    const query = `
        SELECT s.*, u.name, u.birthday, u.sex 
        FROM schedule s
        JOIN users u ON s.user_id = u.accountid
        WHERE s.user_id = ?
        ORDER BY s.scheduledDate, s.appointmentTime
    `;
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ error: 'Failed to fetch appointments' });
        }
        res.json(results);
    });
});

// Schedule a new appointment
router.post('/schedule', (req, res) => {
    const {
        fullName,
        birthday,
        sex,
        scheduledDate,
        appointmentTime,
        procedureName,
        note,
        doctor,
        user_id
    } = req.body;

    // First verify the user exists
    db.query('SELECT * FROM users WHERE accountid = ?', [user_id], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Failed to verify user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        // Insert into schedule table with user data
        const query = `
            INSERT INTO schedule 
            (fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor, status, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'no status', ?)
        `;

        db.query(
            query,
            [user.name, user.birthday, user.sex, scheduledDate, appointmentTime, procedureName, note, doctor, user_id],
            (err, result) => {
                if (err) {
                    console.error('Error scheduling appointment:', err);
                    return res.status(500).json({ error: 'Failed to schedule appointment' });
                }
                res.status(201).json({ 
                    message: 'Appointment scheduled successfully',
                    appointmentId: result.insertId 
                });
            }
        );
    });
});

// Update appointment
router.put('/schedule/:id', (req, res) => {
    const appointmentId = req.params.id;
    const {
        scheduledDate,
        appointmentTime,
        procedureName,
        doctor,
        note,
        status
    } = req.body;

    let query = 'UPDATE schedule SET ';
    let values = [];

    if (scheduledDate) {
        query += 'scheduledDate = ?, ';
        values.push(scheduledDate);
    }
    if (appointmentTime) {
        query += 'appointmentTime = ?, ';
        values.push(appointmentTime);
    }
    if (procedureName) {
        query += 'procedureName = ?, ';
        values.push(procedureName);
    }
    if (doctor) {
        query += 'doctor = ?, ';
        values.push(doctor);
    }
    if (note) {
        query += 'note = ?, ';
        values.push(note);
    }
    if (status) {
        query += 'status = ?, ';
        values.push(status);
    }

    // Remove trailing comma and space
    query = query.slice(0, -2);
    query += ' WHERE ScheduleID = ?';
    values.push(appointmentId);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating appointment:', err);
            return res.status(500).json({ error: 'Failed to update appointment' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment updated successfully' });
    });
});

// Cancel appointment
router.put('/schedule/:id/cancel', (req, res) => {
    const appointmentId = req.params.id;
    
    db.query(
        'UPDATE schedule SET status = "cancelled" WHERE ScheduleID = ?',
        [appointmentId],
        (err, result) => {
            if (err) {
                console.error('Error cancelling appointment:', err);
                return res.status(500).json({ error: 'Failed to cancel appointment' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Appointment not found' });
            }
            res.json({ message: 'Appointment cancelled successfully' });
        }
    );
});

export default router;
