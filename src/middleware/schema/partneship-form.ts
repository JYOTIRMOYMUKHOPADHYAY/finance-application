import { body } from "express-validator";

export const partnershipFormValidationSchema = [
  body("firmName", "Firm Name number must not be empty").notEmpty(),
  body("businessType", "Business Type must not be empty").notEmpty(),
  body("dataOfEstablishment", "Data of Establishment must not be empty").notEmpty(),
  body("placeOfBusiness", "Place of Business must not be empty").notEmpty(),
  body("ownershipType", "Ownership Type must not be empty").notEmpty()
];
