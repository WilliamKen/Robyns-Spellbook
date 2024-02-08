import 'dotenv/config';

import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute SQL queries
async function query(sql, values) {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(sql, values);
    connection.release();
    return [results, fields];
  } catch (error) {
    throw error;
  }
}

export { query };
