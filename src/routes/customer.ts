import { Router } from "express";
import { upload } from "../middleware/fileValidationCheck";
import { businessRegistrationValidationSchema } from "../middleware/schema/businessRegistrationController";
import { validator } from "../middleware/schemaValidator";
import { CustomerController } from "../controllers/customer";

const customer_router = Router();
  const customerController = new CustomerController()
// sole-proprietorship
customer_router.post(
  "/bric",
  upload.fields([
    { name: "files", maxCount: 50 }
  ]),
  businessRegistrationValidationSchema,
  validator,
  customerController.serviceSubmission
);

customer_router.post(
  "/user-dashboard",
  customerController.getServicesSubmisson
);

export default customer_router;
