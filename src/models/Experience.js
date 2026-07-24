import mongoose from 'mongoose';

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
export default Experience;
