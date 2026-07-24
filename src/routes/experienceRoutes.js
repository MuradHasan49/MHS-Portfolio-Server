import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    await newExp.save();
    res.status(201).json(newExp);
  } catch (error) {
    res.status(400).json({ error: "Failed to add experience", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExp);
  } catch (error) {
    res.status(400).json({ error: "Failed to update experience" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete experience" });
  }
});

export default router;
