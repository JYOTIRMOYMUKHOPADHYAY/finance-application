import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { GenericMasterDataService } from "../services/genericMater.service";
import { AWSService } from "../services/AWS.service";

const genericMasterService = new GenericMasterDataService();
const awsService = new AWSService();
export class GenericMasterController {
  constructor() {}

  // public async getDropdownData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const data = await genericMasterService.getDropdownData();
  //     return sendSuccessResponse(res, "Form Submitted Success!", data[0].data);
  //   } catch (error) {
  //     console.log("=====getInTouch====");
  //     console.log(error);
  //     return sendErrorResponse(res, "Invalid data", error, 200);
  //   }
  // }

  public async downloadFile(req: Request, res: Response): Promise<any> {
    try {
      const data = await awsService.downloadFileFromS3(
        req.body.key,
        process.env.AWS_S3_BUCKET!
      );
      return sendSuccessResponse(res, "Form Submitted Success!", data);
    } catch (error: any) {
      console.log("=====downloadFile====");
      console.log(error);
      if (
        error.name === "NoSuchKey" ||
        error.$metadata?.httpStatusCode === 404
      ) {
        const key = req.body.key;
        sendErrorResponse(res, `File not found: ${key}`, error, 401);
      }
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  // public async getMounthData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const data = await genericMasterService.getMounthData();
  //     return sendSuccessResponse(res, "Success!", data);
  //   } catch (error) {
  //     console.log("=====getMounthData====");
  //     console.log(error);
  //     return sendErrorResponse(res, "Invalid data", error, 200);
  //   }
  // }

  // public async getComplianceData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const data = await genericMasterService.getComplianceData(
  //       Number(req.body.id)
  //     );
  //     return sendSuccessResponse(res, "Success!", data);
  //   } catch (error) {
  //     console.log("=====getComplianceData====");
  //     console.log(error);
  //     return sendErrorResponse(res, "Invalid data", error, 200);
  //   }
  // }

  // public async getLinksData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const data = await genericMasterService.getLinksData();
  //     return sendSuccessResponse(res, "Success!", data);
  //   } catch (error) {
  //     console.log("=====getLinksData====");
  //     console.log(error);
  //     return sendErrorResponse(res, "Invalid data", error, 200);
  //   }
  // }

  // public async newsUpdatesData(req: Request, res: Response): Promise<any> {
  //   try {
  //     const data = await genericMasterService.newsUpdatesData();
  //     return sendSuccessResponse(res, "Success!", data);
  //   } catch (error) {
  //     console.log("=====newsUpdatesData====");
  //     console.log(error);
  //     return sendErrorResponse(res, "Invalid data", error, 200);
  //   }
  // }

  public async getCarriersData(req: Request, res: Response): Promise<any> {
    try {
      const data = await genericMasterService.getCarriersData();
      return sendSuccessResponse(res, "Success!", data);
    } catch (error) {
      console.log("=====getCarriersData====");
      console.log(error);
      return sendErrorResponse(res, "Invalid data", error, 200);
    }
  }
}
