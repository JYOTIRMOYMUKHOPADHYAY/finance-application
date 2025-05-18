import { Router } from "express";
import auth_router from "./auth";

import { validateAdmin, validateJWT } from "../middleware/tokenValidator";
import admin_route from "./admin";
import staff_route from "./staff";
import reviewer_router from "./reviewer";
import customer_router from "./customer";

const router = Router();
router.use("/auth", auth_router);
router.use("/services", validateJWT, customer_router);
router.use("/admin", validateJWT, validateAdmin, admin_route);
router.use("/staff",validateJWT, staff_route);
router.use("/reviewer",validateJWT, reviewer_router);

export default router;
