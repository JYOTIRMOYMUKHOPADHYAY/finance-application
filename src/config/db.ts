import { Client } from "pg";

class Database {
  private static instance: Client;

  private constructor() {
    // Private to enforce singleton
  }

  public static getInstance(): Client {
    if (!Database.instance) {
      Database.instance = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
      });

      Database.instance.connect((err) => {
        if (err) {
          console.error("Failed to connect to the database:", err.message);
          process.exit(1); // Exit the app if the DB connection fails
        } else {
          console.log("Connected to the database.");
        }
      });
    }
    return Database.instance;
  }
}

export default Database;
