import { body } from "express-validator";

export const getInTouchValidationSchema = [
  body("name", "Invalid does not Empty").not().isEmpty(),
  body("phone_no", "The minimum password length is 10 characters").isLength({
    min: 10,
  }),
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("required_service", "Invalid does not Empty")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Required service must be a number."),
  body("message", "Invalid does not Empty").not().isEmpty(),
];
