import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { GetInTouchDataService } from "../services/getInTouch.service";

const getInTouch = new GetInTouchDataService();
export class GetInTouchController {
  constructor() {} // private otpGenerator = new OtpGenerator()

  public async getInTouch(req: Request, res: Response): Promise<any> {
    try {
      await getInTouch.getInTouch(req.body);
      return sendSuccessResponse(res, "Form Submitted Success!");
    } catch (error) {
      console.log("=====getInTouch====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 401);
    }
  }
}
