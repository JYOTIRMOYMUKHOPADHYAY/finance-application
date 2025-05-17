import { Router } from "express";
import { upload } from "../middleware/fileValidationCheck";
import { BusinessRergistrationIncorporationController } from "../controllers/services/bsrIs";
import { businessRegistrationValidationSchema } from "../middleware/schema/businessRegistrationController";
import { validator } from "../middleware/schemaValidator";
import { CustomerController } from "../controllers/customer";

const services_router = Router();
const businessRegistrationController =
  new BusinessRergistrationIncorporationController();
  const customerController = new CustomerController()
// sole-proprietorship
services_router.post(
  "/bric",
  upload.fields([
    { name: "files", maxCount: 50 }
  ]),
  businessRegistrationValidationSchema,
  validator,
  businessRegistrationController.soleProprietorship
);

services_router.post(
  "/user-dashboard",
  customerController.getServicesSubmisson
);

export default services_router;
