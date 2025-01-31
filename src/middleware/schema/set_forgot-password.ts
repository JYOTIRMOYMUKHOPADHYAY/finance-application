import { body } from "express-validator";

export const setForgotPasswordValidationSchema = [
  body("phone_no", "Invalid does not Empty").not().isEmpty(),
  body("phone_no", "The minimum password length is 10 characters").isLength({
    min: 10,
  }),
  body("otp", "Old Password does not Empty").not().isEmpty(),
  body("new_password", "Old Password does not Empty").not().isEmpty()
];
