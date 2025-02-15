import { body } from "express-validator";

export const businessRegistrationValidationSchema = [
  body("accountNumber", "Account number must not be empty").notEmpty(),
  body("ifscCode", "IFSC code must not be empty").notEmpty(),
  body("bankName", "Bank name must not be empty").notEmpty(),
];
