import express from "express";
import db from "../db.js";

const router = express.Router();

// GET route for fetching all patient information
router.get('/patient-info', (req, res) => {
    console.log('Received GET request for patient information');
    
    const sql = 'SELECT * FROM patient_info ORDER BY fullName';
    console.log('Executing SQL:', sql);
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            console.error('Error details:', {
                message: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sqlMessage: err.sqlMessage
            });
            return res.status(500).json({ 
                error: 'Database error occurred',
                details: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sqlMessage: err.sqlMessage
            });
        }
        console.log('Successfully fetched patient information:', results);
        res.json(results);
    });
});

// POST route for adding a new patient
router.post('/patient-info', (req, res) => {
    console.log('Received POST request for new patient:', req.body);
    
    const { fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory } = req.body;
    
    const sql = 'INSERT INTO patient_info (fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Failed to add patient',
                details: err.message
            });
        }
        console.log('Successfully added new patient:', result);
        res.status(201).json({ 
            message: 'Patient added successfully',
            id: result.insertId
        });
    });
});

// GET route for fetching all previous visits
router.get('/previous-visits', (req, res) => {
    console.log('Received GET request for previous visits');
    
    const sql = 'SELECT * FROM previous_visits ORDER BY visitDate DESC';
    console.log('Executing SQL:', sql);
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            console.error('Error details:', {
                message: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sqlMessage: err.sqlMessage
            });
            return res.status(500).json({ 
                error: 'Database error occurred',
                details: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sqlMessage: err.sqlMessage
            });
        }
        console.log('Successfully fetched previous visits:', results);
        res.json(results);
    });
});

// POST route for adding a new visit record
router.post('/previous-visits', (req, res) => {
    console.log('Received POST request for new visit:', req.body);
    
    const { PatientID, visitDate, procedure, notes } = req.body;
    
    const sql = 'INSERT INTO previous_visits (PatientID, visitDate, procedure, notes) VALUES (?, ?, ?, ?)';
    const values = [PatientID, visitDate, procedure, notes];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Failed to add visit record',
                details: err.message
            });
        }
        console.log('Successfully added new visit:', result);
        res.status(201).json({ 
            message: 'Visit record added successfully',
            id: result.insertId
        });
    });
});

export default router; 