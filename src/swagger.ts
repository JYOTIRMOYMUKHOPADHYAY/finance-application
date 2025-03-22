import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import swaggerDocument from "./docs/swagger.json"; // Import the Swagger file

export function setupSwagger(app: Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
