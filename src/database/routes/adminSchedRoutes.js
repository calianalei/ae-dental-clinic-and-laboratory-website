import express from "express";
import db from "../db.js";

const router = express.Router();

// GET route for fetching schedules
router.get('/', (req, res) => {
    console.log('Received GET request for schedule');
    console.log('Query parameters:', req.query);
    
    const { doctor, date } = req.query;
    
    let sql = 'SELECT * FROM schedule WHERE 1=1';
    const values = [];
    
    if (doctor) {
        sql += ' AND doctor = ?';
        values.push(doctor);
    }
    
    if (date) {
        sql += ' AND DATE(scheduledDate) = ?';
        values.push(date);
    }
    
    sql += ' ORDER BY scheduledDate, appointmentTime';
    console.log('Executing SQL:', sql, 'with values:', values);
    
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Database error occurred',
                details: err.message,
                code: err.code
            });
        }
        console.log('Successfully fetched schedules:', results);
        res.json(results);
    });
});

// POST route for creating new appointments
router.post('/', (req, res) => {
    console.log('Received POST request for schedule');
    console.log('Request body:', req.body);

    const { fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor } = req.body;

    // Validate required fields
    if (!fullName || !birthday || !sex || !scheduledDate || !appointmentTime || !procedureName || !doctor) {
        console.error('Missing required fields:', { fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, doctor });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO schedule (fullName, birthday, sex, scheduledDate, appointmentTime, procedureName, note, doctor, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'no status')`;
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

// PUT route for updating status
router.put('/:id', (req, res) => {
    console.log('Received PUT request for schedule status update');
    console.log('Schedule ID:', req.params.id);
    console.log('Request body:', req.body);

    const scheduleId = req.params.id;
    const { status } = req.body;

    if (!scheduleId) {
        console.error('Schedule ID is missing');
        return res.status(400).json({ 
            error: 'Schedule ID is required',
            message: 'Please provide a valid schedule ID'
        });
    }

    if (!status) {
        console.error('Status is missing in request body');
        return res.status(400).json({ 
            error: 'Status is required',
            message: 'Please provide a status value'
        });
    }

    // Validate status value
    const validStatuses = ['no status', 'done', 'cancelled'];
    if (!validStatuses.includes(status)) {
        console.error('Invalid status value:', status);
        return res.status(400).json({ 
            error: 'Invalid status value',
            message: `Status must be one of: ${validStatuses.join(', ')}`
        });
    }

    // First check if the schedule exists
    const checkSql = 'SELECT * FROM schedule WHERE ScheduleID = ?';
    db.query(checkSql, [scheduleId], (err, results) => {
        if (err) {
            console.error('Error checking schedule:', err);
            return res.status(500).json({ 
                error: 'Database error',
                message: 'Failed to check schedule existence'
            });
        }

        if (results.length === 0) {
            console.error('No schedule found with ID:', scheduleId);
            return res.status(404).json({ 
                error: 'Schedule not found',
                message: `No schedule found with ID ${scheduleId}`
            });
        }

        // Update the status
        const updateSql = 'UPDATE schedule SET status = ? WHERE ScheduleID = ?';
        console.log('Executing SQL:', updateSql, 'with values:', [status, scheduleId]);

        db.query(updateSql, [status, scheduleId], (err, result) => {
            if (err) {
                console.error('Error updating status:', err);
                return res.status(500).json({ 
                    error: 'Failed to update status',
                    message: 'Database error while updating status'
                });
            }

            if (result.affectedRows === 0) {
                console.error('No rows were updated for ID:', scheduleId);
                return res.status(500).json({ 
                    error: 'Update failed',
                    message: 'No changes were made to the schedule'
                });
            }

            console.log('Status updated successfully:', result);
            res.json({ 
                message: 'Status updated successfully',
                status: status
            });
        });
    });
});

export default router;