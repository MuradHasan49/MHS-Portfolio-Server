import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Murad Hasan" },
  heroSubtitle: { type: String, default: "MERN Stack Developer" },
  heroDescription: { type: String, default: "I specialize in architecting high-performance, scalable web applications..." },
  profileImage: { type: String, default: "" },
  email: { type: String, default: "muradhassan649@gmail.com" },
  github: { type: String, default: "https://github.com/muradhasan49" },
  linkedin: { type: String, default: "https://www.linkedin.com/in/muradhasan49" },
  facebook: { type: String, default: "https://facebook.com/muradhasan49" },
  twitter: { type: String, default: "" },
  resume: { type: String, default: "" },
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
