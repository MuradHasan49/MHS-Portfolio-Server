import express from 'express';
import SkillCategory from '../models/SkillCategory.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const skills = await SkillCategory.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSkill = new SkillCategory(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ error: "Failed to create skill category", details: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedSkill = await SkillCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ error: "Failed to update skill category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await SkillCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill category" });
  }
});

export default router;
