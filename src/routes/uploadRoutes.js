import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    const base64Image = req.file.buffer.toString("base64");
    formData.append("image", base64Image);

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await imgbbRes.json();
    
    if (data.success) {
      res.json({ url: data.data.url });
    } else {
      res.status(500).json({ error: "Failed to upload to ImgBB" });
    }
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
