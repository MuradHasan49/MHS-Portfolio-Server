import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

const experiencesData = [
  {
    title: "Software Engineering Intern",
    company: "Code Alpha",
    location: "Remote",
    period: "Jun 2024 - Aug 2024",
    type: "Internship",
    image: "https://placehold.co/400x400/1e293b/ffffff?text=Code+Alpha",
    certificateUrl: "/assets/files/experience_pdf/codeAlpha.pdf",
    description: [
      "Optimized web application performance with JavaScript and React.js, achieving a 98% error-free rate",
      "Implemented advanced features on a React.js platform, resulting in a 40% surge in user interaction",
    ],
  },
  {
    title: "MERN Stack Development Intern",
    company: "Bharat Intern",
    location: "Remote",
    period: "Jun 2024 - Jul 2024",
    type: "Internship",
    image: "https://placehold.co/400x400/1e293b/ffffff?text=Bharat+Intern",
    certificateUrl: "/assets/files/experience_pdf/bharatIntern.pdf",
    description: [
      "Designed 3 websites with CSS, JavaScript, React.js, Node.js and MongoDB, resulting in a 30% increase in user engagement",
      "Built a money tracker app using HTML, CSS, React.js, Node.js, and MongoDB, improving user financial tracking by 25%",
    ],
  },
  {
    title: "Web Applications Intern",
    company: "CodeClause",
    location: "Remote",
    period: "Jun 2023 - Jul 2023",
    type: "Internship",
    image: "https://placehold.co/400x400/1e293b/ffffff?text=CodeClause",
    certificateUrl: "/assets/files/experience_pdf/codeClause.pdf",
    description: [
      "Engineered a real-time collaborative document editor using Next.js, TypeScript, and Liveblocks, reducing latency by 30%",
      "Implemented and optimized a personal portfolio with Next.js and Tailwind CSS, improving performance by 40%",
    ],
  },
  {
    title: "Web Development Intern",
    company: "Oasis Infobyte",
    location: "Remote",
    period: "Apr 2023 - May 2023",
    type: "Internship",
    image: "https://placehold.co/400x400/1e293b/ffffff?text=Oasis+Infobyte",
    certificateUrl: "/assets/files/experience_pdf/oasisInfobyte.pdf",
    description: [
      "Developed a robust task tracking app, resulting in a 20% increase in team productivity and a 15% reduction in project delivery time",
      "Designed an intuitive UI for a weather app, improving user engagement by 25% and reducing bounce rates by 10%",
    ],
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

    await Experience.deleteMany({});
    console.log("🧹 Cleared old experience records");

    await Experience.insertMany(experiencesData);
    console.log("🌱 Successfully seeded experience!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
