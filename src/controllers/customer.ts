import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { sanitizeData } from "../utils/utils";
import { CustomerService } from "../services/customer";


const customerService = new CustomerService();
export class CustomerController {
  constructor() {}

  public async getServicesSubmisson(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userData = (req as any).user.user_id;
      const data = await customerService.getServicesSubmisson(userData);
      return sendSuccessResponse(res, "success", data);
    } catch (error) {
      console.log("====getServicesSubmisson====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async serviceSubmission(req: Request, res: Response): Promise<void> {
    if (!req.files) {
      sendErrorResponse(res, "Files are required", null, 200);
      return;
    }
    try {
      const userData = (req as any).user;
      await customerService.serviceSubmission(
        req.files! as Record<string, Express.Multer.File[]>,
        sanitizeData(req.body),
        userData
      );
      return sendSuccessResponse(
        res,
        "Documents submitted successfully! Pls wait for approval."
      );
    } catch (error) {
      console.log("====soleProprietorship====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 401);
    }
  }
}
