import { body } from "express-validator";

export const forgotPasswordValidationSchema = [
  body("phone_no", "Invalid does not Empty").not().isEmpty(),
  body("phone_no", "The minimum password length is 10 characters").isLength({
    min: 10,
  }),
];
