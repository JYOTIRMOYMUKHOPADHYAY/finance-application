import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { sanitizeData } from "../../utils/utils";
import { ReviewerService } from "../../services/reviewer/reviewer";

const reviewerService = new ReviewerService();
export class ReviewerController {
  constructor() {} // private staffService = new StaffUserService()


  public async approveRejectServicesSubmission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = sanitizeData(req.body);
      const user = (req as any).user;

      const isSubmitted = data.isApproved ? true : false;

      if (isSubmitted) {
        const staffData = await reviewerService.approveRejectServicesSubmission(
          user,
          data.requestId,
          isSubmitted
        );
        return sendSuccessResponse(res, "Success", staffData, 200);
      }

      const staffData = await reviewerService.approveRejectServicesSubmission(
        user,
        data.requestId
      );
      return sendSuccessResponse(res, "Success", staffData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }
}
