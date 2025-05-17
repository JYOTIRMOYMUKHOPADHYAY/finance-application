import { body } from "express-validator";

export const complianceValidationSchema = [
  body("id", "id must not be empty").notEmpty()
];
