import { Router } from "express";
import auth_router from "./auth";

const router = Router();
router.use("/auth", auth_router);

export default router;
