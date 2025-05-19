import { Router } from "express";
import { StaffController } from "../controllers/staff/staff";

const staff_router = Router();
const stafff = new StaffController();

staff_router.get("/staff-all-dashboard", stafff.getAssignedUserServiceData);
staff_router.post("/search-report", stafff.searchUserServiceReport);
staff_router.get("/staff-dashboard", stafff.getStaffDashboard);
staff_router.post(
  "/staff-approve-reject-service-requests",
  stafff.approveRejectServicesSubmission
);

export default staff_router;
