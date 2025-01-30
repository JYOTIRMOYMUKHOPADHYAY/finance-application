import { Router } from "express";
// import LoginController from "../controllers/login";
import { validator } from "../middleware/schemaValidator";
import { loginValidationSchema } from "../middleware/schema/login";
import { LoginController } from "../controllers/login";
import { registerValidationSchema } from "../middleware/schema/register";
import { RegisterController } from "../controllers/register";
import { forgotPasswordValidationSchema } from "../middleware/schema/forgot-password";
import { OtpGenerator } from "../services/otp.service";
import { ForgotPasswordController } from "../controllers/forgot-password";
import { ServicesController } from "../controllers/services";
import { ApplyJobController } from "../controllers/applyJob";
import { applyJobValidationSchema } from "../middleware/schema/applyJob";
import multer from "multer";

const auth_router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();
const forgotPassword = new ForgotPasswordController();
const services = new ServicesController();
const applyJobController = new ApplyJobController();
const upload = multer({ storage: multer.memoryStorage() });
auth_router.get("/user-types", loginController.getUserTypes);
auth_router.post(
  "/register",
  registerValidationSchema,
  validator,
  registerController.register
);
auth_router.post(
  "/login",
  loginValidationSchema,
  validator,
  loginController.login
);
auth_router.post(
  "/forgot-password",
  forgotPasswordValidationSchema,
  validator,
  forgotPassword.forgotPassword
);

// others
auth_router.get("/services", services.getAllServices);
auth_router.get("/sub-services/:id", services.getSubServices);

//Apply for this job
auth_router.post(
  "/apply-for-job",
  upload.single("file"),
  applyJobValidationSchema,
  validator,
  applyJobController.applyForJob
);

export default auth_router;
