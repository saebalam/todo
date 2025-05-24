
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const todoRouter = express.Router();

todoRouter.get("/api/todos", async (req, res) => {
    const { token } = req.cookies;
  
    if( !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const [user_rows] = await pool.query(
      "SELECT role FROM users WHERE user_id = ?",
      [decoded.user_id] // from JWT token
    );
  
    const role = user_rows[0]?.role;
  
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
  
  todoRouter.post("/api/addTodo", async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { text, status } = req.body;
    await pool.query(
      "INSERT INTO todolist (user_id, text, status) VALUES (?, ?, ?) ",
      [decoded.user_id, text, status]
    );
    const [rows] = await pool.query(
      "SELECT * FROM todolist WHERE user_id = ? ORDER BY created_at DESC",
      [decoded.user_id]
    );
    res.status(200).json(rows);
  });
  
  todoRouter.put("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if(!["Pending","In Progress","Completed"].includes(status)){
      return res.status(404).json({ message: "Invalid Status" });
    }
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
  
  todoRouter.delete("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM todolist WHERE id = ?", [id]);
  
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
  
    res.status(200).json({ message: "Item deleted successfully", deleted: true });
    res.send({ id });
  });

module.exports = todoRouter;