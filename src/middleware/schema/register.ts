import { body } from "express-validator";

export const registerValidationSchema = [
  body("name", "Invalid does not Empty").not().isEmpty(),
  body("phone_no", "The minimum password length is 10 characters").isLength({
    min: 10,
  }),
  body("password", "Invalid does not Empty").not().isEmpty(),
];
