import { Request, Response } from "express";
import { ServicesDataService } from "../services/allService.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";

const services = new ServicesDataService();
export class ServicesController {
  constructor() {}

  public async getAllServices(req: Request, res: Response): Promise<any> {
    try {
      const data = await services.getAllServices();
      return sendSuccessResponse(
        res,
        "All Services Fetched successfully",
        data
      );
    } catch (error) {
      console.log("=====getAllServices====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", null, 200);
    }
  }

  public async getSubServices(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.service_id;
      if (!id || isNaN(Number(id))) {
        return sendErrorResponse(res, "Invalid ID", null, 200);
      }
      const data = await services.getSubServices(Number(id));
      return sendSuccessResponse(
        res,
        "All Sub-Services Fetched successfully",
        data
      );
    } catch (error) {
      console.log("=====getSubServices====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", null, 200);
    }
  }
}
