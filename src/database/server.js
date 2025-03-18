import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import adminSchedRoutes from './routes/adminSchedRoutes.js';
import patientInfoRoutes from './routes/patientInfoRoutes.js';
import patientDashboardRoutes from './routes/patientDashboardRoutes.js';
//import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = 5000; //backend

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/auth', authRoutes);
app.use('/patient', patientRoutes);
app.use('/schedule', adminSchedRoutes);
app.use('/', patientInfoRoutes);
app.use('/patient-dashboard', patientDashboardRoutes);
//app.use('/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
  } else {
    console.error('Error starting server:', err);
  }
});
