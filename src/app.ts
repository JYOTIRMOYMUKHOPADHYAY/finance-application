import express, { Application } from "express";
import routes from "./routes/routes";
import "./config/environment";
import { globalErrorHandler } from "./middleware/responseHandeler";

export default class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.checkDatabaseConnection();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private async initializeRoutes(): Promise<any> {
    this.app.get("/", async (req, res) => {
      res.json({ message: "Welcome to Finance Application" });
    });
    this.app.use("/api", routes);

    this.app.all("*", (req, res) => {
      res.status(404).json({
        success: false,
        message: `Cannot find ${req.originalUrl} on this server!`,
      });
    });

    // Global error handling middleware
    this.app.use(globalErrorHandler);
  }

  private async checkDatabaseConnection(): Promise<void> {
    try {
      const db = require("./config/db").default; // Import the db connection
      await db`SELECT 1`; // Test query to verify connection
      console.log("Database connected successfully.");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1); // Exit process if connection fails
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
