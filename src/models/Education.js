import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  degree: { type: String, required: true },
  grade: { type: String, required: true },
  image: { type: String, default: "" },
  resultUrl: { type: String },
  coursework: { type: [String], default: [] },
  subjects: { type: [String], default: [] },
  description: { type: String, required: true }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
export default Education;
