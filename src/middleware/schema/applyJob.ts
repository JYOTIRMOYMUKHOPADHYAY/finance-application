import { body } from "express-validator";

export const applyJobValidationSchema = [
  body("name", "Name must not be empty").notEmpty(),
  body("phone_no", "Phone number must be at least 10 characters long").isLength({ min: 10 }),
  body("experience", "Experience must not be empty").notEmpty(),
  body("current_location", "Current location must not be empty").notEmpty(),
  body("agreement")
    .isBoolean().withMessage("Agreement must be a boolean value")
];
