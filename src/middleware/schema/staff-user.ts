import { body } from "express-validator";

export const createUserValidationSchema = [
  body("name", "Name must not be empty").notEmpty(),
  body("email", "Email must not be empty").notEmpty().isEmail(),
  body("phone_no", "Phone number must be at least 10 characters long").isLength({ min: 10 }),
  // body("qualification", "Qualification must not be empty").notEmpty(),
  // body("experience", "Experience must not be empty").notEmpty(),
  // body("service_id", "service_id must not be empty").notEmpty(),
  body("password", "Experience must not be empty").notEmpty()
];


export const updateUserValidationSchema = [
  body("name", "Name must not be empty").notEmpty(),
  body("phone_no", "Phone number must be at least 10 characters long").isLength({ min: 10 }),
  body("email", "Email must not be empty").notEmpty().isEmail(),
  body("staff_id", "Staff Id (staff_id) must not be empty").notEmpty()
];
