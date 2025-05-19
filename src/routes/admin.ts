import { Router } from "express";
import { validator } from "../middleware/schemaValidator";
import {
  createUserValidationSchema,
  updateReviewerUserValidationSchema,
  updateUserValidationSchema,
} from "../middleware/schema/staff-user";
import { approveRejectServicesSubmissionValidationSchema } from "../middleware/schema/approveRejectServicesSubmission";
import { UpdateNewsController } from "../controllers/admin/newsUpdate";
import { CreateReviewerController } from "../controllers/admin/reviewer";
import { AdminController } from "../controllers/admin/admin";

const admin_route = Router();
const createReviewerController = new CreateReviewerController();
const newsUpdatesController = new UpdateNewsController();
const adminController = new AdminController();

// ADMIN SPECIFIC FUNCTIONALITY
admin_route.get(
  "/all-service-requests",
  adminController.getAllServicesSubmission
);
admin_route.get(
  "/new-service-requests",
  adminController.getNewServicesSubmission
);
admin_route.post(
  "/approve-reject-service-requests",
  approveRejectServicesSubmissionValidationSchema,
  validator,
  adminController.approveRejectServicesSubmission
);

admin_route.post("/map-staff-customer", adminController.mapStaffCustomer);

// STAFF SPECIFIC FUNCTIONALITY
admin_route.post(
  "/create-staff",
  createUserValidationSchema,
  validator,
  adminController.createStaff
);

admin_route.post(
  "/edit-staff",
  updateUserValidationSchema,
  validator,
  adminController.updateStaff
);

admin_route.get("/get-all-staff", adminController.getAllStaff);

admin_route.get("/get-all-customer", adminController.getAllCustomer);


// REVIEWER SPECIFIC FUNCTIONALITY
admin_route.post(
  "/create-reviewer",
  createUserValidationSchema,
  validator,
  createReviewerController.createReviewer
);

admin_route.post(
  "/edit-reviewer",
  updateReviewerUserValidationSchema,
  validator,
  createReviewerController.updateReviewer
);

admin_route.get("/get-all-reviewer", createReviewerController.getAllReviewer);

admin_route.post(
  "/search-report",
  adminController.searchReports
);

admin_route.post(
  "/news-updates",
  newsUpdatesController.newsUpdatesData
);


export default admin_route;
