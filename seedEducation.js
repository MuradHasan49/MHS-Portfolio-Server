import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

const educationData = [
  {
    school: 'Naogaon Polytechnic Institute',
    location: 'Naogaon, Rajshahi, Bangladesh',
    duration: 'July 2022 - June 2026',
    degree: 'Diploma in Computer Science and Technology',
    grade: 'CGPA: 3.00 (out of 4.00)',
    image: 'https://placehold.co/600x800/1e293b/ffffff?text=College+Image',
    resultUrl: '/assets/files/education_pdf/B Tech.pdf',
    coursework: ["Software Development", 'DSA', 'OOPs', 'DBMS', 'AI', 'ML', 'OS', 'Networking'],
    description: 'During my time at Naogaon Polytechnic Institute, I have built a strong foundation in computer science, focusing on software development, problem-solving, and real-world applications. Engaging in hands-on projects, internships, and coding challenges has helped me enhance my technical and analytical skills.',
  },
  {
    school: 'Hanaill No`mania Kamil M.A. Madrasah',
    location: 'Joypurhat, Rajshahi, Bangladesh',
    duration: 'July 2019 - June 2021',
    degree: 'Secondary School Certificate / Dakhil (Science)',
    grade: 'GPA: 4.39 out of 5.00',
    image: 'https://placehold.co/600x800/1e293b/ffffff?text=School+Image',
    resultUrl: '/assets/files/education_pdf/HS MARK SHEET.pdf',
    subjects: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology',
      'ICT',
      'Quran & Tafsir',
      'Hadith',
      'Islamic Studies',
      'Arabic'
    ],
    description: 'During my SSC Science studies at Hanaill No`mania Kamil M.A. Madrasah, I built a strong foundation in science, mathematics, and ICT while also gaining valuable Islamic knowledge and moral education. The combination of modern education and Islamic values helped me develop discipline, responsibility, and analytical thinking skills. This journey inspired me to pursue technology and computer science while maintaining the ethical principles and teachings of Islam in both my personal and professional life.',
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing in .env");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Education.deleteMany({});
    console.log("🧹 Cleared old education records");

    await Education.insertMany(educationData);
    console.log("🌱 Successfully seeded education!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
