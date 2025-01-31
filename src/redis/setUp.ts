import Redis, { Redis as RedisClient } from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

class RedisService {
  private static instance: RedisService;
  private client: RedisClient;

  private constructor() {
    this.client = new Redis({
      host: String(process.env.REDIS_HOST),
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined,
      lazyConnect: true, // Prevents auto-connect
    });

    this.client.on("connect", () => console.log("✅ Connected to Redis"));
    this.client.on("error", (err) => console.error("❌ Redis error:", err));
  }

  // Singleton pattern: Ensure only one instance exists
  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  // Function to explicitly connect to Redis
  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("🚀 Redis connection established");
    } catch (error) {
      console.error("❌ Redis connection error:", error);
    }
  }

  // Function to disconnect Redis
  public async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      console.log("🚀 Redis disconnected gracefully");
    } catch (error) {
      console.error("❌ Redis disconnection error:", error);
    }
  }

  // Getter for Redis client
  public getClient(): RedisClient {
    return this.client;
  }

  public async setWithExpiry(
    key: string,
    value: string,
    expiryInSeconds = 300
  ): Promise<void> {
    try {
      await this.client.setex(key, expiryInSeconds, value);
      console.log(
        `✅ Key "${key}" set with expiry of ${expiryInSeconds} seconds`
      );
    } catch (error) {
      console.error("❌ Error setting key in Redis:", error);
    }
  }

  // ✅ Retrieve value from Redis
  public async getValue(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error("❌ Error retrieving key from Redis:", error);
      return null;
    }
  }
}

// Export the singleton instance
export default RedisService.getInstance();
