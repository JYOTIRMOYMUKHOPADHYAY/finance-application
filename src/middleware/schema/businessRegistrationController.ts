import { body } from "express-validator";

export const businessRegistrationValidationSchema = [
  body("serviceId", "Service ID must not be empty").notEmpty(),
  body("subServiceId", "Sub Service ID must not be empty").notEmpty(),
  body("mobileNo", "Mobile No must not be empty").notEmpty(),
  body("mailId", "Mail ID must not be empty").notEmpty(),
  body("periodId", "Period must not be empty").notEmpty(),
  body("message", "Mesage must not be empty").notEmpty()
];
