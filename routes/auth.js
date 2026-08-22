import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { findByUsername } from "../utils/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password are required." });
  const user = findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: "Invalid credentials." });
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || "family-movie-watchlist-secret",
    { expiresIn: "1h" }
  );
  return res.json({ token });
});

export default router;
