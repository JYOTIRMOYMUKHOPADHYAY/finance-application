import { body } from "express-validator";

export const loginValidationSchema = [
  body("phone_no", "Invalid does not Empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];


export const refreshToken = [
  body("refreshToken", "Invalid does not Empty").not().isEmpty(),
];
