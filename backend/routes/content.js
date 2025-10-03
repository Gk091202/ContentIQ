import express from "express";
import Content from "../models/Content.js";
import User from "../models/User.js";
import { authenticate } from "../middleware/auth.js";
import { generateContent, summarizeContent } from "../services/ai.js";

const router = express.Router();

// Create generated content
router.post("/generate", authenticate, async (req, res) => {
  try {
    const { prompt, tone, length } = req.body;
    console.log("Generate request:", { prompt, tone, length });
    const outputText = await generateContent(prompt, tone, length);
    const content = new Content({
      user: req.user._id,
      type: "generated",
      prompt,
      outputText,
      tone,
      length,
    });
    await content.save();
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "usageStats.generatedCount": 1 },
    });
    res.status(201).json(content);
  } catch (err) {
    console.error("AI generation error:", err.response?.data || err.message);
    res.status(500).json({
      message: "AI generation failed.",
      error: err.response?.data?.error?.message || err.message,
    });
  }
});

// Summarize content
router.post("/summarize", authenticate, async (req, res) => {
  try {
    const { inputText, url, format } = req.body;
    console.log("Summarize request:", { hasInput: !!inputText, url, format });
    let textToSummarize = inputText;
    if (url) {
      // Fetch article text from URL (simplified)
      // In production, use a robust parser
      const response = await fetch(url);
      textToSummarize = await response.text();
    }
    const outputText = await summarizeContent(textToSummarize, format);
    const content = new Content({
      user: req.user._id,
      type: "summarized",
      url,
      inputText: textToSummarize,
      outputText,
      format,
    });
    await content.save();
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "usageStats.summarizedCount": 1 },
    });
    res.status(201).json(content);
  } catch (err) {
    console.error("AI summarization error:", err.response?.data || err.message);
    res.status(500).json({
      message: "AI summarization failed.",
      error: err.response?.data?.error?.message || err.message,
    });
  }
});

// Get user content history
router.get("/history", authenticate, async (req, res) => {
  try {
    const { search, type, startDate, endDate } = req.query;
    const query = { user: req.user._id };
    if (type) query.type = type;
    if (search) query.outputText = { $regex: search, $options: "i" };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    const contents = await Content.find(query).sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history." });
  }
});

// Update content
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { outputText } = req.body;
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { outputText, updatedAt: Date.now() },
      { new: true }
    );
    if (!content)
      return res.status(404).json({ message: "Content not found." });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Failed to update content." });
  }
});

// Delete content
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const content = await Content.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!content)
      return res.status(404).json({ message: "Content not found." });
    res.json({ message: "Content deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete content." });
  }
});

export default router;
