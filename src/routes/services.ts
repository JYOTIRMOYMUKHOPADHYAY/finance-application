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

// Parternership Form
// services_router.post(
//   "/partnership-form",
//   upload.fields([
//     { name: "partnershipForm", maxCount: 1 },
//     { name: "partnershipDeed", maxCount: 1 },
//     { name: "affidavitConfirmingCopy", maxCount: 1 },
//     { name: "partnerPanCard", maxCount: 1 },
//     { name: "partnerAddressProof", maxCount: 1 },
//     { name: "ownershipDocument", maxCount: 1 },
//     { name: "businessAddressProof", maxCount: 1 },
//   ]),
//   partnershipFormValidationSchema,
//   validator,
//   businessRegistrationController.parternershipForm
// );

// OPC Registration
// services_router.post(
//   "/opc-registration",
//   upload.fields([
//     { name: "directorPanCard", maxCount: 1 },
//     { name: "identityProof", maxCount: 1 },
//     { name: "addressProof", maxCount: 1 },
//     { name: "registeredOfficeProof", maxCount: 1 },
//     { name: "noc", maxCount: 1 },
//     { name: "photograph", maxCount: 1 },
//     { name: "moa", maxCount: 1 },
//     { name: "aoa", maxCount: 1 }
//   ]),
//   opcRegistrationValidationSchema,
//   validator,
//   businessRegistrationController.opcRegistration
// );


// services_router.post(
//   "/pvt-company-registration",
//   upload.fields([
//     { name: "directorPanCard", maxCount: 1 },
//     { name: "identityProof", maxCount: 1 },
//     { name: "addressProof", maxCount: 1 },
//     { name: "registeredOfficeProof", maxCount: 1 },
//     { name: "noc", maxCount: 1 },
//     { name: "photograph", maxCount: 1 },
//     { name: "moa", maxCount: 1 },
//     { name: "aoa", maxCount: 1 }
//   ]),
//   opcRegistrationValidationSchema,
//   validator,
//   businessRegistrationController.opcRegistration
// );

export default services_router;
