import { Router } from "express";
import auth_router from "./auth";
import services_router from "./services";
import { validateAdmin, validateJWT } from "../middleware/tokenValidator";
import admin_route from "./admin";
import staff_route from "./staff";
import reviewer_router from "./reviewer";

const router = Router();
router.use("/auth", auth_router);
router.use("/services", validateJWT, services_router);
router.use("/admin", validateJWT, validateAdmin, admin_route);
router.use("/staff",validateJWT, staff_route);
router.use("/reviewer", reviewer_router);

export default router;
