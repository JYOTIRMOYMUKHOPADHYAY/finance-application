import { Router } from "express";
// import LoginController from "../controllers/login";
import { validator } from "../middleware/schemaValidator";
import { loginValidationSchema } from "../middleware/schema/login";
import { LoginController } from "../controllers/login";
import { registerValidationSchema } from "../middleware/schema/register";
import { RegisterController } from "../controllers/register";


const auth_router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();

auth_router.get("/user-types", loginController.getUserTypes);

auth_router.post("/register",registerValidationSchema, validator, registerController.register);
auth_router.post("/login",loginValidationSchema, validator, loginController.login);


export default auth_router;
