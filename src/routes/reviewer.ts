import { Router } from "express";
import { StaffController } from "../controllers/staff/staff";
import { CreateStaffController } from "../controllers/admin/user";

const reviewer_router = Router();
const stafff = new StaffController();
const adminController = new CreateStaffController();
reviewer_router.get("/reviewer-all-dashboard", adminController.getAllServicesSubmission);
reviewer_router.post("/search-report", stafff.searchStaffReport);
reviewer_router.get("/reviewer-dashboard", adminController.getNewServicesSubmission);
reviewer_router.post(
  "/reviewer-approve-reject-service-requests",
  stafff.approveRejectServicesSubmission
);

export default reviewer_router;
