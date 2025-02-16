import { body } from "express-validator";

export const opcRegistrationValidationSchema = [
  body("subServiceId", "subServiceId must not be empty").notEmpty(),
];
