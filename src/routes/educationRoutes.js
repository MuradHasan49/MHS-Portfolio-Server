import express from 'express';
import Education from '../models/Education.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch education" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    await newEdu.save();
    res.status(201).json(newEdu);
  } catch (error) {
    res.status(400).json({ error: "Failed to add education", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEdu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEdu);
  } catch (error) {
    res.status(400).json({ error: "Failed to update education" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete education" });
  }
});

export default router;
