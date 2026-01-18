import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["background", "draggable"],
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  // draggable image data
  x: Number,
  y: Number,
  width: Number,
  height: Number,

  // container info (optional)
  containerWidth: Number,
  containerHeight: Number,
});

const Image = mongoose.model("Image", imageSchema);
export default Image;