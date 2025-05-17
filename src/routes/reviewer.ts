import { Router } from "express";
import { StaffController } from "../controllers/staff/staff";
import { CreateStaffController } from "../controllers/admin/user";
import { ReviewerController } from "../controllers/reviewer/reviewer";

const reviewer_router = Router();
const stafff = new StaffController();
const adminController = new CreateStaffController();
const reviewerController = new ReviewerController();
reviewer_router.get("/reviewer-all-dashboard", adminController.getAllServicesSubmission);
reviewer_router.get("/reviewer-dashboard", adminController.getNewServicesSubmission);


// reviewer_router.post("/search-report", adminController.getNewServicesSubmission);
reviewer_router.post(
  "/reviewer-approve-reject-service-requests",
  reviewerController.approveRejectServicesSubmission
);

export default reviewer_router;
