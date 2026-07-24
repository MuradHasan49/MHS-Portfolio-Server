import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.patch("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    } else {
      settings = await Settings.create(req.body);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

export default router;
