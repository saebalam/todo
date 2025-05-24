const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const pool = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

//auth
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0) {
    console.log("User does not exist");
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  }

  console.log(rows);

  const user = rows[0];
  if (user.password != password) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  }

  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
  res.cookie("token", token).json({
    message: "login success",
    token,
    username: user.username,
    isAdmin: user.role === "admin",
  });
});

app.post("/api/auth/signup", async (req, res) => {
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
    console.log("Inserted successfully with ID:", result);

    const token = jwt.sign(
      { user_id: result.insertId },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token)
      .json({ message: "sgnup success", token, username });
  } else {
    // res.status(400).send({ message: "Invalid data" });
  }
});

app.get("/api/auth/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "Logged out successfully", success: true });
});

//todo apis
app.get("/api/todos", async (req, res) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [user_rows] = await pool.query(
    "SELECT role FROM users WHERE user_id = ?",
    [decoded.user_id] // from JWT token
  );

  const role = user_rows[0]?.role;

  console.log("role", role);
  if (role == "admin") {
    const [rows] = await pool.query(
      `SELECT * FROM todolist ORDER BY created_at DESC`
    );
    res.status(200).json(rows);
  } else {
    const [rows] = await pool.query(
      `SELECT * FROM todolist WHERE user_id = ${decoded.user_id} ORDER BY created_at DESC`
    );
    res.status(200).json(rows);
  }
});

app.post("/api/addTodo", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("decoded", decoded);

  const { text, status } = req.body;
  await pool.query(
    "INSERT INTO todolist (user_id, text, status) VALUES (?, ?, ?) ",
    [decoded.user_id, text, status]
  );
  // console.log(rows);
  const [rows] = await pool.query(
    "SELECT * FROM todolist WHERE user_id = ? ORDER BY created_at DESC",
    [decoded.user_id]
  );
  res.status(200).json(rows);
});

// app.post("/todos", (req, res) => {
//   const { text, status } = req.body;
//   res.send({ id: 1, text, status });
// });

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE todolist SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("DELETE FROM todolist WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted successfully", deleted: true });
  res.send({ id });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
