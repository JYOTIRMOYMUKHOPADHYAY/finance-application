import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
const sql = postgres({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "accuracy",
  port: Number(process.env.DB_PORT) || 5433,
  max: 10, // Maximum connections in the pool
  idle_timeout: 5, // Close idle clients after 5 seconds
  connect_timeout: 10, // Timeout for connection
  ssl: process.env.DB_SSL === "true", // Use SSL if set in .env
});

// sql.("error", (err: any) => {
//   console.error("Database connection error:", err);
// });

export default sql;