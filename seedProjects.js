import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

const projectsData = [
  {
    slug: "digitools-buy-platform",
    title: "DigiTools Buy Platform",
    description: "Modern SaaS website designed for efficient digital product presentation and purchasing.",
    fullDescription: "DigiTools is a high-performance SaaS platform engineered to facilitate seamless digital product storefronts. It enables digital creators and businesses to dynamically present their offerings with professional layouts, real-time interactivity, and highly intuitive user interfaces, enhancing both buyer satisfaction and operational visibility.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=DigiTools",
    github: "https://github.com/MuradHasan49/PH-Assignment-6",
    live: "https://mhs-digitools.netlify.app/",
    tags: ["Next.js", "DaisyUI", "JavaScript", "API", "Recharts", "Toastify", "Netlify"],
    techStack: [
      "Next.js for efficient server-side rendering and state-of-the-art routing.",
      "DaisyUI & Tailwind CSS to create aesthetic, responsive, and consistent user interfaces.",
      "Recharts to present complex analytics intuitively to users.",
      "Toastify for elegant interactive notifications.",
      "RESTful APIs for dynamic information fetching and rendering."
    ],
    contributions: [
      "Architected and developed the entire front-end using Next.js, ensuring optimal initial load performance.",
      "Designed and integrated multiple rich interactive analytics dashboards using Recharts to represent product metrics."
    ],
    challenges: [
      "Managing real-time rendering of large datasets within the analytics panels without compromising the UI's frames-per-second."
    ],
    futurePlans: [
      "Integrate a robust serverless backend (such as Supabase or Firebase) for user accounts and true database syncing."
    ]
  },
  {
    slug: "book-store",
    title: "Book Store Platform",
    description: "A comprehensive digital bookstore enabling users to browse, search, and purchase books.",
    fullDescription: "A comprehensive digital bookstore enabling users to browse, search, and purchase books.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Book+Store",
    github: "https://github.com/MuradHasan49/PH-Assignment-8",
    live: "https://mhs-book-store.netlify.app/",
    tags: ["React", "Tailwind CSS", "Express.js", "MongoDB"],
    techStack: ["React", "Express.js"],
    contributions: ["Frontend Development", "Backend Architecture"],
    challenges: ["State management across complex carts"],
    futurePlans: ["Implement Stripe for real payments"]
  },
  {
    slug: "portfolio-website",
    title: "Personal Portfolio",
    description: "A futuristic and highly interactive portfolio showcasing my skills and projects.",
    fullDescription: "A futuristic and highly interactive portfolio showcasing my skills and projects.",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Portfolio",
    github: "https://github.com/MuradHasan49/MHS-Portfolio",
    live: "https://muradhasan49.github.io/MHS-Portfolio/",
    tags: ["React", "Framer Motion", "Tailwind"],
    techStack: ["React", "Framer Motion"],
    contributions: ["Full UI/UX design"],
    challenges: ["Optimizing Framer Motion animations"],
    futurePlans: ["Add dynamic CMS"]
  }
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing in .env");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Project.deleteMany({});
    console.log("🧹 Cleared old projects");

    await Project.insertMany(projectsData);
    console.log("🌱 Successfully seeded projects!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
