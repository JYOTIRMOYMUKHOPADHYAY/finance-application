import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { StaffService } from "../../services/staff/staff.service";


const staffService = new StaffService();
export class StaffController {
  constructor() {} // private staffService = new StaffUserService()

  public async getStaffDashboard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // console.log(req.body);
      const data = await staffService.getStaffDashboard(req.body.staff_id);
      return sendSuccessResponse(res, "Success", data, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 400);
    }
  }


}
