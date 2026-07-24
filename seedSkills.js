import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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

const skillsData = [
  {
    category: "Programming Languages",
    icon: "Code2",
    items: [
      { name: "JavaScript", icon: "JavaScriptLogo", color: "group-hover:text-[#F7DF1E]" },
      { name: "TypeScript", icon: "TypeScriptLogo", color: "group-hover:text-[#3178C6]" },
      { name: "Python", icon: "PythonLogo", color: "group-hover:text-[#3776AB]" },
      { name: "Bash", icon: "BashLogo", color: "group-hover:text-[#4EAA25]" },
    ],
  },
  {
    category: "Front-End Development",
    icon: "Layout",
    items: [
      { name: "React.js", icon: "ReactLogo", color: "group-hover:text-[#61DAFB]" },
      { name: "Next.js", icon: "NextjsLogo", color: "group-hover:text-black dark:group-hover:text-white" },
      { name: "Tailwind", icon: "TailwindLogo", color: "group-hover:text-[#06B6D4]" },
      { name: "Redux", icon: "ReduxLogo", color: "group-hover:text-[#764ABC]" },
    ],
  },
  {
    category: "Back-End Development",
    icon: "Server",
    items: [
      { name: "Node.js", icon: "NodeLogo", color: "group-hover:text-[#339933]" },
      { name: "Express", icon: "ExpressLogo", color: "group-hover:text-black dark:group-hover:text-white" },
      { name: "JWT", icon: "JWTLogo", color: "group-hover:text-[#D63AFF]" },
      { name: "BetterAuth", icon: "BetterAuthLogo", color: "group-hover:text-blue-500" },
    ],
  },
  {
    category: "Databases & Cloud Storage",
    icon: "Database",
    items: [
      { name: "MongoDB", icon: "MongoDBLogo", color: "group-hover:text-[#47A248]" },
      { name: "Cloudinary", icon: "Cloud", color: "group-hover:text-[#3448C5]" },
      { name: "AWS", icon: "AWSLogo", color: "group-hover:text-[#FF9900]" },
    ],
  },
  {
    category: "Version Control & DevOps",
    icon: "GitLogo",
    items: [
      { name: "Git", icon: "GitLogo", color: "group-hover:text-[#F05032]" },
      { name: "GitHub", icon: "GitHubLogo", color: "group-hover:text-black dark:group-hover:text-white" },
      { name: "Vercel", icon: "VercelLogo", color: "group-hover:text-black dark:group-hover:text-white" },
      { name: "Render", icon: "RenderLogo", color: "group-hover:text-[#46E3B7]" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "Wrench",
    items: [
      { name: "VS Code", icon: "VSCodeLogo", color: "group-hover:text-[#007ACC]" },
      { name: "Git Desktop", icon: "GitLogo", color: "group-hover:text-[#563D7C]" },
      { name: "Compass", icon: "MongoDBLogo", color: "group-hover:text-[#47A248]" },
      { name: "Postman", icon: "PostmanLogo", color: "group-hover:text-[#FF6C37]" },
    ],
  },
  {
    category: "Operating Systems",
    icon: "Terminal",
    items: [
      { name: "Windows", icon: "WindowsLogo", color: "group-hover:text-[#0078D6]" },
      { name: "Ubuntu", icon: "UbuntuLogo", color: "group-hover:text-[#E95420]" },
      { name: "Linux", icon: "LinuxLogo", color: "group-hover:text-[#FCC624]" },
    ],
  },
  {
    category: "Soft Skills",
    icon: "Brain",
    items: [
      { name: "Teamwork", icon: "Users", color: "group-hover:text-blue-500" },
      { name: "Communication", icon: "MessageSquare", color: "group-hover:text-green-500" },
      { name: "Debugging", icon: "Wrench", color: "group-hover:text-orange-500" },
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

    await SkillCategory.deleteMany({});
    console.log("🧹 Cleared old skills");

    await SkillCategory.insertMany(skillsData);
    console.log("🌱 Successfully seeded skills!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
