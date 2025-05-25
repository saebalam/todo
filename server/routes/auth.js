const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const bcrypt = require("bcrypt");

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
  const isCorrect = bcrypt.compareSync(password, user.password);

  if (!isCorrect) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  }

  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
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
    const user_id = new Date(); 
    

    const [rows] = await pool.query(
      "SELECT 1 FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length > 0) {
      return res.status(401).json({ message: "Email Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
   

    const sql =
      "INSERT INTO users ( username,email, password) VALUES (?, ?, ?)";
    const values = [username, email, hashedPassword];

    const [result] = await pool.query(sql, values);


    const token = jwt.sign(
      { user_id: result.insertId },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token)
      .json({ message: "sgnup success", token, username, isAdmin: false });
  } else {
  }
});

authRouter.get("/api/auth/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "Logged out successfully", success: true });
});

module.exports = authRouter;
