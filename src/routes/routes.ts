import { Router } from "express";
import auth_router from "./auth";
import services_router from "./services";
import { validateAdmin, validateJWT } from "../middleware/tokenValidator";
import admin_route from "./admin";

const router = Router();
router.use("/auth", auth_router);
// validateJWT
router.use("/services", services_router);
router.use("/admin", validateJWT, validateAdmin, admin_route);

export default router;
