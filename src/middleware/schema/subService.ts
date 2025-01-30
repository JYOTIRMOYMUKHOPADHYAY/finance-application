import { body } from "express-validator";

export const subServiceValidationSchema = [
  body("service_id", "service_id must not be empty").notEmpty()
];
