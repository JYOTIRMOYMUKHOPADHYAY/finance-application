import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { GeneralService } from "../services/general.service";
import { sanitizeData } from "../utils/utils";
import { AWSService } from "../services/AWS.service";

const generalService = new GeneralService();
export class GeneralController {
  constructor() {}

  public async getUserTypes(req: Request, res: Response): Promise<void> {
    const userTypes = await generalService.getUserTypes();
    return sendSuccessResponse(res, "Success", userTypes);
  }

  public async getLinksData(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.getLinksData();
      return sendSuccessResponse(res, "Success!", data);
    } catch (error) {
      console.log("=====getLinksData====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async newsUpdatesData(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.newsUpdatesData();
      return sendSuccessResponse(res, "Success!", data);
    } catch (error) {
      console.log("=====newsUpdatesData====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async getAllServices(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.getAllServices();
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
      const data = await generalService.getSubServices(Number(id));
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

  public async getPeriodIdData(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.getPeriodIdData();
      return sendSuccessResponse(res, "Form Submitted Success!", data[0].data);
    } catch (error) {
      console.log("=====getInTouch====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async getMounthData(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.getMounthData();
      return sendSuccessResponse(res, "Success!", data);
    } catch (error) {
      console.log("=====getMounthData====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async getComplianceData(req: Request, res: Response): Promise<any> {
    try {
      const data = await generalService.getComplianceData(Number(req.body.id));
      return sendSuccessResponse(res, "Success!", data);
    } catch (error) {
      console.log("=====getComplianceData====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

    public async applyForJob(req: Request, res: Response): Promise<any> {
    const data = sanitizeData(req.body);
    if (!req.file) {
      return sendErrorResponse(
        res,
        "File is required",
        new Error("File is required"),
        200
      );
    }
    if (!data.agreement || data.agreement != "true") {
      return sendErrorResponse(
        res,
        "Please accept the aggreement!",
        new Error("Please accept the aggreement!"),
        200
      );
    }
    const aws = new AWSService();
    const uploadPath = await aws.uploadFileToS3(
      req.file!,
      process.env.AWS_S3_RESUME_UPLOAD_PATH!
    );
    data.filePath = uploadPath.location;
    data.agreement = true;
    data.user_type = 1;
    data.status = "PENDING";
    await generalService.applyForJob(data);
    return sendSuccessResponse(res, "Applied Success!");
  }

    public async getInTouch(req: Request, res: Response): Promise<any> {
      try {
        await generalService.getInTouch(req.body);
        return sendSuccessResponse(res, "Form Submitted Success!");
      } catch (error) {
        console.log("=====getInTouch====");
        console.log(error);
        return sendErrorResponse(res, "Invalid data", error, 200);
      }
    }
}
