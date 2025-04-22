import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { StaffService } from "../../services/staff/staff.service";
import { sanitizeData } from "../../utils/utils";

const staffService = new StaffService();
export class StaffController {
  constructor() {} // private staffService = new StaffUserService()

  public async getAllStaffDashboard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user = (req as any).user;
      const data = await staffService.getAllStaffDashboard(user.user_id);
      return sendSuccessResponse(res, "Success", data, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async searchStaffReport(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const data = await staffService.searchStaffReport({
        staff_id: user.user_id,
        status: req.body.status == "NONE" ? null : req.body.status,
        service_id: req.body.service_id == "NONE" ? null : req.body.service_id,
      });
      return sendSuccessResponse(res, "Success", data, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getStaffDashboard(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const data = await staffService.getStaffDashboard(user.user_id);
      return sendSuccessResponse(res, "Success", data, 200);
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
      const user = (req as any).user;

      if (data.isAccepted && data.isSubmitted) {
        return sendErrorResponse(
          res,
          "INVALID DATA, Cannot process data isAccepted and isSubmitted together.",
          Error,
          400
        );
      }

      const isSubmitted = data.isSubmitted ? true : false;

      if (isSubmitted && !data.isAccepted) {
        const staffData = await staffService.approveRejectServicesSubmission(
          user,
          data.isAccepted,
          data.requestId,
          isSubmitted
        );
        return sendSuccessResponse(res, "Success", staffData, 200);
      }

      const staffData = await staffService.approveRejectServicesSubmission(
        user,
        data.isAccepted,
        data.requestId
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }
}
