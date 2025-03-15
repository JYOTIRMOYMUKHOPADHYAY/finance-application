import { Request, Response } from "express";
import { StaffUserService } from "../services/admin/user";
import { sendErrorResponse, sendSuccessResponse } from "../middleware/responseHandeler";



const userService = new StaffUserService();
export class CustomerController {
  constructor() {}

  public async getServicesSubmisson(req: Request, res: Response): Promise<void> {
  
    try {
      const userData = req.body?.user_id;
      const data = await userService.getServicesSubmisson(
        userData
      );
      return sendSuccessResponse(
        res,
        "success",
        data
      );
    } catch (error) {
      console.log("====getServicesSubmisson====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 401);
    }
  }

}
