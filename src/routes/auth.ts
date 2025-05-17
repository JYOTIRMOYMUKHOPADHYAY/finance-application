import { Router } from "express";
import { validator } from "../middleware/schemaValidator";
import { loginValidationSchema, refreshToken } from "../middleware/schema/login";
import { LoginController } from "../controllers/login";
import { registerValidationSchema } from "../middleware/schema/register";
import { RegisterController } from "../controllers/register";
import { forgotPasswordValidationSchema } from "../middleware/schema/forgot-password";
import { ForgotPasswordController } from "../controllers/forgot-password";
import { ServicesController } from "../controllers/services";
import { ApplyJobController } from "../controllers/applyJob";
import { applyJobValidationSchema } from "../middleware/schema/applyJob";
import { subServiceValidationSchema } from "../middleware/schema/subService";
import { getInTouchValidationSchema } from "../middleware/schema/get-in-touch";
import { GetInTouchController } from "../controllers/getInTouch";
import { upload } from "../middleware/fileValidationCheck";
import { setForgotPasswordValidationSchema } from "../middleware/schema/set_forgot-password";
import { GenericMasterController } from "../controllers/genericMaster";
import { GeneralController } from "../controllers/general";

const auth_router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();
const forgotPassword = new ForgotPasswordController();
const services = new ServicesController();
const applyJobController = new ApplyJobController();
const getInTouchController = new GetInTouchController();
const genericMasterController = new GenericMasterController();
const generalController = new GeneralController();
// User Types
auth_router.get("/user-types", generalController.getUserTypes);

auth_router.get(
  "/general-links",
  generalController.getLinksData
);

auth_router.get(
  "/news-updates",
  generalController.newsUpdatesData
);

// Services
auth_router.get("/services", generalController.getAllServices);

// Sub Services
auth_router.post(
  "/sub-services",
  subServiceValidationSchema,
  generalController.getSubServices
);

// Generic dropdown
auth_router.get(
  "/period-dropdown",
  generalController.getPeriodIdData
);

auth_router.get(
  "/mounth-data",
  generalController.getMounthData
);

auth_router.post(
  "/compliance-data",
  generalController.getComplianceData
);

//Apply for this job
auth_router.post(
  "/apply-for-job",
  upload.single("file"),
  // applyJobValidationSchema,
  // validator,
  generalController.applyForJob
);
// get in touch
auth_router.post(
  "/get-in-touch",
  getInTouchValidationSchema,
  validator,
  generalController.getInTouch
);




// Login
auth_router.post(
  "/login",
  loginValidationSchema,
  validator,
  loginController.login
);

auth_router.post(
  "/refresh-token",
  refreshToken,
  validator,
  loginController.generateRefreshToken
);

// Forgot Password
auth_router.post(
  "/forgot-password",
  forgotPasswordValidationSchema,
  validator,
  forgotPassword.forgotPassword
);

// Set Forgot Password
auth_router.post(
  "/set-forgot-password",
  setForgotPasswordValidationSchema,
  validator,
  forgotPassword.setForgotPassword
);
















auth_router.post(
  "/file-download",
  genericMasterController.downloadFile
);

// ......ApplyJobController[Symbol]...ApplyJobController
auth_router.get(
  "/get-carrier-submission",
  genericMasterController.getCarriersData
);

// Register
auth_router.post(
  "/register",
  registerValidationSchema,
  validator,
  registerController.register
);




export default auth_router;
