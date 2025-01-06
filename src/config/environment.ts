import dotenv from "dotenv";

class Environment {
  constructor() {
    dotenv.config();
    this.validateEnvironmentVariables();
  }

  private validateEnvironmentVariables(): void {
    const requiredVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }
  }
}

export default new Environment();
