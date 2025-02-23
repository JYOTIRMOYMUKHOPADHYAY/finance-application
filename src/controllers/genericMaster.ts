import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { GenericMasterDataService } from "../services/genericMater.service";

const genericMasterService = new GenericMasterDataService();
export class GenericMasterController {
  constructor() {} 

  public async getDropdownData(req: Request, res: Response): Promise<any> {
    try {
      const data = await genericMasterService.getDropdownData();
      return sendSuccessResponse(res, "Form Submitted Success!",data[0]);
    } catch (error) {
      console.log("=====getInTouch====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 401);
    }
  }
}
