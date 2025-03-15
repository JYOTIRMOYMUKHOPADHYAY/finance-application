import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";


export class StaffController {
  constructor() {} // private staffService = new StaffUserService()

  public async getStaffDashboard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      console.log(req.body)
      return sendSuccessResponse(res, "Success", "staffData", 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 400);
    }
  }


}
