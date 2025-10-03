import request from "supertest";
import express from "express";
import authRoutes from "../routes/auth.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock mongoose models
jest.mock("../models/User.js");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({
        _id: "123",
        username: "testuser",
        email: "test@example.com",
      });

      const response = await request(app).post("/api/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully.");
    });

    it("should return 400 if email already exists", async () => {
      User.findOne.mockResolvedValue({
        email: "test@example.com",
      });

      const response = await request(app).post("/api/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email already in use.");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login user with valid credentials", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      User.findOne.mockResolvedValue({
        _id: "123",
        email: "test@example.com",
        password: hashedPassword,
        username: "testuser",
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user.username).toBe("testuser");
    });

    it("should return 400 with invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid credentials.");
    });
  });
});
