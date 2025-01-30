import { Request, Response } from "express";
import { AWSService } from "../services/AWS.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { ApplyJobService } from "../services/applyJob.service";

const applyJob = new ApplyJobService();
export class ApplyJobController {
  constructor() // private otpGenerator = new OtpGenerator()
  {}

  public async applyForJob(req: Request, res: Response): Promise<any> {
    if (!req.file) {
      return sendErrorResponse(
        res,
        "File is required",
        new Error("File is required"),
        401
      );
    }
    if (!req.body.agreement || req.body.agreement != "true") {
      return sendErrorResponse(
        res,
        "Please accept the aggreement!",
        new Error("Please accept the aggreement!"),
        401
      );
    }
    const aws = new AWSService();
    const uploadPath = await aws.uploadFileToS3(
      req.file!,
      process.env.AWS_S3_RESUME_UPLOAD_PATH!
    );
    req.body.filePath = uploadPath.location;
    req.body.agreement = true;
    req.body.user_type = 1;
    req.body.status = "PENDING";
    await applyJob.applyForJob(req.body);
    return sendSuccessResponse(res, "Applied Success!");
  }
}
