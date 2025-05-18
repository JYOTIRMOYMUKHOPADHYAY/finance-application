import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { hashPassword, sanitizeData } from "../../utils/utils";
import { AdminService } from "../../services/admin/admin";
import { USERTYPE_ID } from "../../globalVariable";
import { UserService } from "../../services/user";

const adminService = new AdminService();
const userService = new UserService();
export class AdminController {
  constructor() {}

  public async getAllServicesSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const staffData = await adminService.getAllServicesSubmission();

      const response: any = {
        success: true,
        message: "Success",
        data: staffData.data,
        statusCount: staffData.statusData,
      };
      res.status(200).json(response);

      // return sendSuccessResponse(res, "Success", {...staffData}, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getNewServicesSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const staffData = await adminService.getNewServicesSubmission();
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async approveRejectServicesSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = sanitizeData(req.body);
      const staffData = await adminService.approveRejectServicesSubmission(
        data.isApproved,
        data.requestId
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async mapStaffCustomer(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await adminService.mapStaffCustomer(
        req.body.customer_id,
        req.body.staff_id,
        req.body.service_id,
        req.body.requestId,
        (req as any).user.user_id
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async searchReports(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await adminService.searchReports(
        req.body.status == "NONE" ? null : req.body.status,
        req.body.service_id == "NONE" ? null : req.body.service_id,
        req.body.staff_id == "NONE" ? null : req.body.staff_id
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async createStaff(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const user = await userService.getUser(req.body.phone_no);
    if (user) {
      return sendErrorResponse(
        res,
        "User already registered with this phone no.",
        null,
        200
      );
    }
    try {
      const { salt, hash } = hashPassword(req.body.password);
      const userData = await userService.createUser({
        name: req.body.name,
        email: req.body?.email ? req.body?.email : "",
        phone_no: req.body.phone_no,
        qualification: req.body.qualification,
        experience: req.body.experience,
        service_id: req.body.service_id,
        userType_id: USERTYPE_ID.STAFF,
        salt,
        hash,
        created_by: adminUser.user_id,
      });
      delete userData[0].password;
      delete userData[0].password_salt;
      return sendSuccessResponse(
        res,
        "Staff Created successfully.",
        userData[0],
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async updateStaff(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const staffUser = req.body;
    const userData = await userService.getUserById(staffUser.staff_id);
    if (!userData) {
      return sendErrorResponse(
        res,
        "No user Found.",
        null,
        200
      );
    }
    if (userData[0].phone_no != staffUser.phone_no) {
      return sendErrorResponse(
        res,
        "Sorry You cnt change the phone no.",
        null,
        200
      );
    }
    delete staffUser.phone_no;
    try {
      const staffData = await adminService.updateStaff(staffUser, adminUser);
      delete staffData[0].password;
      delete staffData[0].password_salt;
      return sendSuccessResponse(
        res,
        "Staff Updated successfully.",
        "staffData[0]",
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getAllStaff(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await adminService.getUser(USERTYPE_ID.STAFF);
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getAllCustomer(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await adminService.getUser(USERTYPE_ID.CUSTOMER);
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

    public async createReviewer(req: Request, res: Response): Promise<void> {
      const adminUser = (req as any).user;
      const user = await userService.getUser(req.body.phone_no);
      if (user) {
        return sendErrorResponse(
          res,
          "User already registered with this phone no.",
          null,
          200
        );
      }
      try {
        const { salt, hash } = hashPassword(req.body.password);
        const userData = await userService.createUser({
          name: req.body.name,
          email: req.body?.email ? req.body?.email : "",
          phone_no: req.body.phone_no,
          qualification: req.body.qualification,
          experience: req.body.experience,
          service_id: req.body.service_id,
          userType_id: USERTYPE_ID.REVIEWER,
          salt,
          hash,
          created_by: adminUser.user_id,
        });
        delete userData[0].password;
        delete userData[0].password_salt;
        return sendSuccessResponse(
          res,
          "Staff Created successfully.",
          userData[0],
          200
        );
      } catch (error: any) {
        return sendErrorResponse(res, error.message, error, 200);
      }
    }
  
    public async updateReviewer(req: Request, res: Response): Promise<void> {
      const adminUser = (req as any).user;
      const reviewerUser = req.body;
      // break;
      const userData = await userService.getUserById(reviewerUser.reviewer_id);
      if (!userData) {
        return sendErrorResponse(res, "No user Found.", null, 200);
      }
      if (userData[0].phone_no != reviewerUser.phone_no) {
        return sendErrorResponse(
          res,
          "Sorry You cnt change the phone no.",
          null,
          200
        );
      }
      delete reviewerUser.phone_no;
      reviewerUser.staff_id = reviewerUser.reviewer_id;
      try {
        const reviewerData = await adminService.updateStaff(
          reviewerUser,
          adminUser
        );
        delete reviewerData[0].password;
        delete reviewerData[0].password_salt;
        return sendSuccessResponse(
          res,
          "Reviewer Updated successfully.",
          reviewerData[0],
          200
        );
      } catch (error: any) {
        return sendErrorResponse(res, error.message, error, 200);
      }
    }
  
    public async getAllReviewer(req: Request, res: Response): Promise<void> {
      try {
        const reviewerData = await adminService.getUser(USERTYPE_ID.REVIEWER);
        return sendSuccessResponse(res, "Success", reviewerData, 200);
      } catch (error: any) {
        return sendErrorResponse(res, error.message, error, 200);
      }
    }
}
