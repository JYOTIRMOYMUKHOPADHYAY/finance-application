import { Router } from "express";
import auth_router from "./auth";
import services_router from "./services";
import { validateJWT } from "../middleware/tokenValidator";

const router = Router();
router.use("/auth", auth_router);
router.use("/services", validateJWT, services_router);

export default router;
