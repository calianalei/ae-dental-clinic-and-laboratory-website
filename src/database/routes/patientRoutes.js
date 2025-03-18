import express from "express";
import db from "../db.js";

const router = express.Router();

// GET All Patients
router.get("/patients", (req, res) => {
  db.query("SELECT * FROM patient_info", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET Patient by ID (including visit history)
router.get("/patients/:id", (req, res) => {
  const patientId = req.params.id;

  const query = `
    SELECT * FROM patient_info WHERE PatientID = ?;
    SELECT * FROM previous_visits WHERE PatientID = ?;
  `;

  db.query(query, [patientId, patientId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results[0].length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({
      patient: results[0][0], 
      visits: results[1]
    });
  });
});

// Add New Patient
router.post("/patients", (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming data
    const { fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory } = req.body;
  
    const query = "INSERT INTO patient_info (fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(query, [fullName, birthday, address, contactNum, allergies, currentMedications, medicalHistory], (err, result) => {
      if (err) {
        console.error("Database Error:", err); // Log the database error
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Patient added successfully", patientId: result.insertId });
    });
  });

// Add a Visit Record
router.post("/visits", (req, res) => {
  const { PatientID, visitDate, procedurePerformed, notes } = req.body;

  const query = "INSERT INTO previous_visits (PatientID, visitDate, procedurePerformed, notes) VALUES (?, ?, ?, ?)";
  
  db.query(query, [PatientID, visitDate, procedurePerformed, notes], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Visit recorded successfully", visitId: result.insertId });
  });
});

// Delete Patient by ID
router.delete("/patients/:id", (req, res) => {
  const patientId = req.params.id;

  const query = "DELETE FROM patient_info WHERE PatientID = ?";
  
  db.query(query, [patientId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  });
});

export default router;
