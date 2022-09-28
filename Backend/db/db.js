const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: "true",
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

module.exports = pool;
