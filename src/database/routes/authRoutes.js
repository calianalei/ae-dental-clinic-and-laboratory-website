import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', user });
    });
});

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, contactnumber, birthday, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO users (name, email, contactnumber, birthday, password) VALUES (?, ?, ?, ?, ?)',
            [name, email, contactnumber, birthday, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: 'User created successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.query(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, email],
            (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'Password reset successful' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
