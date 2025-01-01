import { Router } from "express";
import LoginController from "../controllers/login";
import { validator } from "../middleware/schemaValidator";
import { loginValidationSchema } from "../middleware/schema/login";


const auth_router = Router();
const loginController = new LoginController();

auth_router.post("/login",loginValidationSchema, validator, loginController.login);

export default auth_router;
