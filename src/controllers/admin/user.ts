import { Request, Response } from "express";
import {
  ApiResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { RegisterService } from "../../services/register.service";
import { LoginService } from "../../services/login.service";
import { hashPassword, sanitizeData } from "../../utils/utils";
import { USERTYPE_ID } from "../../globalVariable";
import { StaffUserService } from "../../services/admin/user";

const registerService = new RegisterService();
const loginService = new LoginService();
const staffService = new StaffUserService();
export class CreateStaffController {
  constructor() {} // private staffService = new StaffUserService()

  public async getAllServicesSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const staffData = await staffService.getAllServicesSubmission();

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
      const staffData = await staffService.getNewServicesSubmission();
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
      const staffData = await staffService.approveRejectServicesSubmission(
        data.isApproved,
        data.requestId
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async createStaff(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const user = await loginService.getUser(req.body.phone_no);
    if (user) {
      return sendErrorResponse(res, "User already registered with this phone no.", null, 200);
    }
    try {
      const { salt, hash } = hashPassword(req.body.password);
      const userData = await registerService.register({
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
    const userData = await loginService.getUser(staffUser.phone_no);
    if(userData) {
      return sendErrorResponse(res, "User already registered with this phone no.", null, 200);
    }
    console.log(staffUser)
    try {
      const staffData = await staffService.updateStaff(staffUser, adminUser);
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
      const staffData = await staffService.getUser(USERTYPE_ID.STAFF);
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getAllCustomer(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await staffService.getUser(USERTYPE_ID.CUSTOMER);
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async mapStaffCustomer(req: Request, res: Response): Promise<void> {
    try {
      const staffData = await staffService.mapStaffCustomer(
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
      const staffData = await staffService.searchReports(
        req.body.status == "NONE" ? null : req.body.status,
        req.body.service_id == "NONE" ? null : req.body.service_id,
        req.body.staff_id == "NONE" ? null : req.body.staff_id
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }
}
