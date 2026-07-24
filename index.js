import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from "better-auth/node";
import { auth } from './auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// ==========================================
// Authentication (Better Auth)
// ==========================================
// Disable public registration
app.post("/api/auth/sign-up/*", (req, res) => {
  res.status(403).json({ error: "Registration is disabled for security." });
});

// Mount Better Auth handler
app.all("/api/auth/*", (req, res) => {
  return toNodeHandler(auth)(req, res);
});

// ==========================================
// Database Connection
// ==========================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// Base Routes
// ==========================================
app.get('/', (req, res) => {
  res.send('MHS Portfolio Backend is running!');
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
