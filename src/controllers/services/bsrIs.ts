import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { BusinessRegistrationIncorporationService } from "../../services/bsris/bsris.service";
import { sanitizeData } from "../../utils/utils";

const BRISService = new BusinessRegistrationIncorporationService();
export class BusinessRergistrationIncorporationController {
  constructor() {}

  public async soleProprietorship(req: Request, res: Response): Promise<void> {
    if (
      !req.files
    ) {
      sendErrorResponse(
        res,
        "Files are required",
        null,
        200
      );
      return;
    }
    try {
      const userData = (req as any).user;
      await BRISService.soleProprietorship(
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
