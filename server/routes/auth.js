const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const authRouter = express.Router();

authRouter.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  }

  const user = rows[0];
  if (user.password != password) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  }

  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "None" })
    .json({
      message: "login success",
      token,
      username: user.username,
      isAdmin: user.role === "admin",
    });
});

authRouter.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const user_id = new Date(); // Current timestamp

    const [rows] = await pool.query(
      "SELECT 1 FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length > 0) {
      return res.status(401).json({ message: "Email Already Exists" });
    }

    const sql =
      "INSERT INTO users ( username,email, password) VALUES (?, ?, ?)";
    const values = [username, email, password];

    const [result] = await pool.query(sql, values);

    const token = jwt.sign(
      { user_id: result.insertId },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token)
      .json({ message: "sgnup success", token, username });
  } else {
  }
});

authRouter.get("/api/auth/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "Logged out successfully", success: true });
});

module.exports = authRouter;
