import { Request, Response } from "express";
import { AWSService } from "../services/AWS.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { ApplyJobService } from "../services/applyJob.service";
import { sanitizeData } from "../utils/utils";

const applyJob = new ApplyJobService();
export class ApplyJobController {
  constructor() // private otpGenerator = new OtpGenerator()
  {}

  // public async applyForJob(req: Request, res: Response): Promise<any> {
  //   const data = sanitizeData(req.body);
  //   if (!req.file) {
  //     return sendErrorResponse(
  //       res,
  //       "File is required",
  //       new Error("File is required"),
  //       200
  //     );
  //   }
  //   if (!data.agreement || data.agreement != "true") {
  //     return sendErrorResponse(
  //       res,
  //       "Please accept the aggreement!",
  //       new Error("Please accept the aggreement!"),
  //       200
  //     );
  //   }
  //   const aws = new AWSService();
  //   const uploadPath = await aws.uploadFileToS3(
  //     req.file!,
  //     process.env.AWS_S3_RESUME_UPLOAD_PATH!
  //   );
  //   data.filePath = uploadPath.location;
  //   data.agreement = true;
  //   data.user_type = 1;
  //   data.status = "PENDING";
  //   await applyJob.applyForJob(data);
  //   return sendSuccessResponse(res, "Applied Success!");
  // }
}
