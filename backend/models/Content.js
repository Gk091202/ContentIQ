import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["generated", "summarized"], required: true },
  prompt: { type: String },
  url: { type: String },
  inputText: { type: String },
  outputText: { type: String, required: true },
  tone: { type: String },
  length: { type: String },
  format: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Content", contentSchema);
