import { body } from "express-validator";

export const approveRejectServicesSubmissionValidationSchema = [
  body("requestId", "requestId must not be empty").notEmpty(),
  body("isApproved", "isApproved must not be empty").notEmpty(),
];
