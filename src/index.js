import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from "better-auth/node";

// Config
import connectDB from './config/db.js';
import { auth } from './config/auth.js';

// Routes
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://muradhasan49.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Auth Routes (Better Auth)
app.post(["/api/auth/sign-up", "/api/auth/sign-up/email"], (req, res) => {
  res.status(403).json({ error: "Registration is disabled for security." });
});
app.all("/api/auth/*", (req, res) => {
  return toNodeHandler(auth)(req, res);
});

// API Routes
app.get("/", (req, res) => {
  res.json({ message: "MHS Portfolio API is running perfectly! 🚀" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);

// Export for Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

export default app;
