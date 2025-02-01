import { Router } from "express";
import { validator } from "../middleware/schemaValidator";
import { loginValidationSchema } from "../middleware/schema/login";
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

const auth_router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();
const forgotPassword = new ForgotPasswordController();
const services = new ServicesController();
const applyJobController = new ApplyJobController();
const getInTouchController = new GetInTouchController();

// User Types
auth_router.get("/user-types", loginController.getUserTypes);

// Register
auth_router.post(
  "/register",
  registerValidationSchema,
  validator,
  registerController.register
);

// Login
auth_router.post(
  "/login",
  loginValidationSchema,
  validator,
  loginController.login
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

// Services
auth_router.get("/services", services.getAllServices);

// Sub Services
auth_router.post(
  "/sub-services",
  subServiceValidationSchema,
  services.getSubServices
);

//Apply for this job
auth_router.post(
  "/apply-for-job",
  upload.single("file"),
  applyJobValidationSchema,
  validator,
  applyJobController.applyForJob
);

// get in touch
auth_router.post(
  "/get-in-touch",
  getInTouchValidationSchema,
  validator,
  getInTouchController.getInTouch
);

export default auth_router;
