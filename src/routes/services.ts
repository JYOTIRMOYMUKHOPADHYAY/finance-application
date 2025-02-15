import { Router } from "express";
import { upload } from "../middleware/fileValidationCheck";
import { BusinessRergistrationIncorporationController } from "../controllers/services/bsrIs";
import { businessRegistrationValidationSchema } from "../middleware/schema/businessRegistrationController";
import { validator } from "../middleware/schemaValidator";
import { partnershipFormValidationSchema } from "../middleware/schema/partneship-form";

const services_router = Router();
const businessRegistrationController =
  new BusinessRergistrationIncorporationController();

// sole-proprietorship
services_router.post(
  "/sole-proprietorship",
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "idCard", maxCount: 1 },
    { name: "bankPassbookPage", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "rentalAgreement", maxCount: 1 },
    { name: "noc", maxCount: 1 },
    { name: "bills", maxCount: 3 }, // Allows up to 3 bills
    { name: "tradeLicense", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
  ]),
  businessRegistrationValidationSchema,
  validator,
  businessRegistrationController.soleProprietorship
);

// Parternership Form
services_router.post(
  "/partnership-form",
  upload.fields([
    { name: "partnershipForm", maxCount: 1 },
    { name: "partnershipDeed", maxCount: 1 },
    { name: "affidavitConfirmingCopy", maxCount: 1 },
    { name: "partnerPanCard", maxCount: 1 },
    { name: "partnerAddressProof", maxCount: 1 },
    { name: "ownershipDocument", maxCount: 1 },
    { name: "businessAddressProof", maxCount: 1 },
  ]),
  partnershipFormValidationSchema,
  validator,
  businessRegistrationController.parternershipForm
);

export default services_router;
