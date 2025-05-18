import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { sanitizeData } from "../../utils/utils";
import { AdminService } from "../../services/admin/admin";



const staffService = new AdminService();
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
