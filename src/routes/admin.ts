import { Router } from "express";
import { validator } from "../middleware/schemaValidator";
import { CreateStaffController } from "../controllers/admin/user";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "../middleware/schema/staff-user";
import { approveRejectServicesSubmissionValidationSchema } from "../middleware/schema/approveRejectServicesSubmission";

const admin_route = Router();
const createStaffControllerData = new CreateStaffController();

// admin_route.get("/dashboard", createStaffControllerData.adminDashBoard);
admin_route.get(
  "/all-service-requests",
  createStaffControllerData.getAllServicesSubmission
);
admin_route.get(
  "/new-service-requests",
  createStaffControllerData.getNewServicesSubmission
);
admin_route.post(
  "/approve-reject-service-requests",
  approveRejectServicesSubmissionValidationSchema,
  validator,
  createStaffControllerData.approveRejectServicesSubmission
);

admin_route.post(
  "/create-staff",
  createUserValidationSchema,
  validator,
  createStaffControllerData.createStaff
);

admin_route.post(
  "/edit-staff",
  updateUserValidationSchema,
  validator,
  createStaffControllerData.updateStaff
);

admin_route.get("/get-all-staff", createStaffControllerData.getAllStaff);

admin_route.get("/get-all-customer", createStaffControllerData.getAllCustomer);

// admin_route.post(
//   "/map-customer-staff",
//   updateUserValidationSchema,
//   validator,
//   createStaffControllerData.updateStaff
// );

export default admin_route;
