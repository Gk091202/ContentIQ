import request from "supertest";
import express from "express";
import contentRoutes from "../routes/content.js";
import Content from "../models/Content.js";
import { authenticate } from "../middleware/auth.js";

// Mock dependencies
jest.mock("../models/Content.js");
jest.mock("../models/User.js");
jest.mock("../middleware/auth.js");
jest.mock("../services/ai.js", () => ({
  generateContent: jest.fn().mockResolvedValue("Generated content here"),
  summarizeContent: jest.fn().mockResolvedValue("Summary here"),
}));

const app = express();
app.use(express.json());

// Mock authentication middleware
authenticate.mockImplementation((req, res, next) => {
  req.user = { _id: "user123" };
  next();
});

app.use("/api/content", contentRoutes);

describe("Content Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/content/generate", () => {
    it("should generate content successfully", async () => {
      Content.prototype.save = jest.fn().mockResolvedValue({
        _id: "content123",
        type: "generated",
        prompt: "Test prompt",
        outputText: "Generated content here",
      });

      const response = await request(app)
        .post("/api/content/generate")
        .set("Authorization", "Bearer token123")
        .send({
          prompt: "Test prompt",
          tone: "formal",
          length: "medium",
        });

      expect(response.status).toBe(201);
      expect(response.body.type).toBe("generated");
    });
  });

  describe("GET /api/content/history", () => {
    it("should return user content history", async () => {
      const mockContents = [
        { _id: "1", type: "generated", outputText: "Content 1" },
        { _id: "2", type: "summarized", outputText: "Content 2" },
      ];

      Content.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockContents),
      });

      const response = await request(app)
        .get("/api/content/history")
        .set("Authorization", "Bearer token123");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it("should filter content by type", async () => {
      const mockContents = [
        { _id: "1", type: "generated", outputText: "Content 1" },
      ];

      Content.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockContents),
      });

      const response = await request(app)
        .get("/api/content/history?type=generated")
        .set("Authorization", "Bearer token123");

      expect(response.status).toBe(200);
      expect(Content.find).toHaveBeenCalledWith(
        expect.objectContaining({ type: "generated" })
      );
    });
  });

  describe("PUT /api/content/:id", () => {
    it("should update content successfully", async () => {
      Content.findOneAndUpdate = jest.fn().mockResolvedValue({
        _id: "content123",
        outputText: "Updated content",
      });

      const response = await request(app)
        .put("/api/content/content123")
        .set("Authorization", "Bearer token123")
        .send({ outputText: "Updated content" });

      expect(response.status).toBe(200);
      expect(response.body.outputText).toBe("Updated content");
    });

    it("should return 404 if content not found", async () => {
      Content.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .put("/api/content/nonexistent")
        .set("Authorization", "Bearer token123")
        .send({ outputText: "Updated content" });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/content/:id", () => {
    it("should delete content successfully", async () => {
      Content.findOneAndDelete = jest.fn().mockResolvedValue({
        _id: "content123",
      });

      const response = await request(app)
        .delete("/api/content/content123")
        .set("Authorization", "Bearer token123");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Content deleted.");
    });
  });
});
