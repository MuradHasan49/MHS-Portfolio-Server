import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing in .env");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Settings.deleteMany({});
    
    await Settings.create({
      github: "https://github.com/MuradHasan49",
      linkedin: "https://www.linkedin.com/in/murad-hasan-1a3b1a208/",
      facebook: "https://www.facebook.com/m.h.shadhin.18/",
      email: "muradhassan649@gmail.com",
      resume: "/assets/files/Murad_hasan_Resume_Frontend_Developer.pdf",
      heroTitle: "Murad Hasan",
      heroSubtitle: "MERN Stack Developer",
      heroDescription: "I specialize in architecting high-performance, scalable web applications and crafting seamless, interactive digital experiences. Passionate about building production-grade solutions using MongoDB, Express.js, React, Node.js, and modern web technologies.",
      profileImage: "/assets/home/profile.png"
    });
    
    console.log("🌱 Successfully seeded settings & social links!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
