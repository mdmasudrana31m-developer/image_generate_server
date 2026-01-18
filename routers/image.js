import express from "express";
import multer from "multer";
import Image from "../models/image.js";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * SAVE IMAGE + SIZE DATA
 */
router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const { type, x, y, width, height } = req.body;

    // Check if image with same type exists
    let existingImage = await Image.findOne({ type });

    if (existingImage) {
      // Update existing image
      if (req.file) {
        existingImage.imageUrl = `/uploads/${req.file.filename}`;
      }
      existingImage.x = x || existingImage.x;
      existingImage.y = y || existingImage.y;
      existingImage.width = width || existingImage.width;
      existingImage.height = height || existingImage.height;

      await existingImage.save();

      return res.json({
        success: true,
        data: existingImage,
      });
    }

    // Create new image if doesn't exist
    const newImage = new Image({
      type,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      x,
      y,
      width,
      height,
    });

    await newImage.save();

    res.json({
      success: true,
      data: newImage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET SAVED LAYOUT
 */
router.get("/", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

/**
 * DELETE ALL IMAGES
 */
router.delete("/delete-all", async (req, res) => {
  try {
    await Image.deleteMany({});
    res.json({ success: true, message: "All images deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE BACKGROUND IMAGE ONLY
 */
router.delete("/delete-background", async (req, res) => {
  try {
    await Image.deleteOne({ type: "background" });
    res.json({ success: true, message: "Background deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
