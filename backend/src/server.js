import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/connectDB.js';

import authRoutes from './routes/authRoutes.js';
import poultryRoutes from './routes/poultryRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import productionRoutes from './routes/productionRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

const app = express();


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/poultry', poultryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/gemini', geminiRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Chicken Manager API is running' });
});

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();