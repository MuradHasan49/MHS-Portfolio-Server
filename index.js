import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import nodemailer from 'nodemailer';
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
app.post(["/api/auth/sign-up", "/api/auth/sign-up/email"], (req, res) => {
  res.status(403).json({ error: "Registration is disabled for security." });
});

// Mount Better Auth handler
app.use("/api/auth", (req, res) => {
  return toNodeHandler(auth)(req, res);
});

// ==========================================
// Database Connection
// ==========================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// Mongoose Models
// ==========================================
const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String, required: true },
  github: { type: String, required: true },
  live: { type: String, required: true },
  tags: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  contributions: { type: [String], default: [] },
  challenges: { type: [String], default: [] },
  futurePlans: { type: [String], default: [] },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, default: "" }
  }]
}, { timestamps: true });

const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  degree: { type: String, required: true },
  grade: { type: String, required: true },
  image: { type: String, required: true },
  resultUrl: { type: String },
  coursework: { type: [String], default: [] },
  subjects: { type: [String], default: [] },
  description: { type: String, required: true }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  certificateUrl: { type: String },
  description: { type: [String], default: [] }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

const settingsSchema = new mongoose.Schema({
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  facebook: { type: String, default: "" },
  email: { type: String, default: "" },
  resume: { type: String, default: "" },
  heroTitle: { type: String, default: "" },
  heroSubtitle: { type: String, default: "" },
  heroDescription: { type: String, default: "" },
  profileImage: { type: String, default: "" },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

// ==========================================
// Base Routes & APIs
// ==========================================
app.get('/', (req, res) => {
  res.send('MHS Portfolio Backend is running! ☠');
});

// -- Projects API --
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to create project' });
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update project' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

app.get('/api/projects/slug/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project by slug' });
  }
});
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete project' });
  }
});

// -- Skills API --
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await SkillCategory.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const newSkill = new SkillCategory(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create skill category' });
  }
});

app.patch('/api/skills/:id', async (req, res) => {
  try {
    const updatedSkill = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update skill category' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await SkillCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete skill category' });
  }
});

// -- Education API --
app.get('/api/education', async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education records' });
  }
});

app.post('/api/education', async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    const savedEdu = await newEdu.save();
    res.status(201).json(savedEdu);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create education record' });
  }
});

app.patch('/api/education/:id', async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEdu);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update education record' });
  }
});

app.delete('/api/education/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete education record' });
  }
});

// -- Experience API --
app.get('/api/experience', async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience records' });
  }
});

app.post('/api/experience', async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    const savedExp = await newExp.save();
    res.status(201).json(savedExp);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create experience record' });
  }
});

app.patch('/api/experience/:id', async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExp);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update experience record' });
  }
});

app.delete('/api/experience/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete experience record' });
  }
});

// -- Settings API --
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.patch('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
      await settings.save();
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update settings' });
  }
});

// -- Upload API (ImgBB) --
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    if (!process.env.IMGBB_API_KEY) {
      return res.status(500).json({ error: 'IMGBB_API_KEY is not configured in backend/.env' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const formData = new FormData();
    formData.append('image', base64Image);

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await imgbbRes.json();

    if (data.success) {
      res.json({ url: data.data.url });
    } else {
      console.error('ImgBB API Error:', data);
      res.status(500).json({ error: 'ImgBB upload failed' });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ==========================================
// Contact Form API
// ==========================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail_address@gmail.com') {
      return res.status(500).json({ error: "Email configuration is missing in backend/.env" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #000;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="margin-bottom: 10px;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
