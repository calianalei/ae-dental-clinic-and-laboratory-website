import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import adminSchedRoutes from './routes/adminSchedRoutes.js';
//import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = 5; //backend

app.use(cors());
app.use(express.json());

// API routes
app.use('/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api', adminSchedRoutes);
//app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
