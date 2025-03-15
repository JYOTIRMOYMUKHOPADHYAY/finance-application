import { Router } from "express";
import { StaffController } from "../controllers/staff/staff";


const staff_router = Router();
const stafff = new StaffController()

staff_router.post(
"/staff-dashboard",
stafff.getStaffDashboard
);

export default staff_router;