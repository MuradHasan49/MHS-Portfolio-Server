import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    color: { type: String, default: "" }
  }]
}, { timestamps: true });

const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
export default SkillCategory;
