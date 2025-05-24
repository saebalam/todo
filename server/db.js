require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection pool to your local MySQL database

const DATABASE_URL = process.env.DATABASE_URL || 'localhost';
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME;

const pool = mysql.createPool({
  host: DATABASE_URL,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
