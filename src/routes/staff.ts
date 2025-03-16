import { Router } from "express";
import { StaffController } from "../controllers/staff/staff";

const staff_router = Router();
const stafff = new StaffController();

staff_router.post("/staff-dashboard", stafff.getStaffDashboard);
staff_router.post(
  "/staff-approve-reject-service-requests",
  stafff.approveRejectServicesSubmission
);

export default staff_router;
