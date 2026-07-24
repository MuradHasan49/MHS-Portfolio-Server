import mongoose from 'mongoose';

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
export default Project;
