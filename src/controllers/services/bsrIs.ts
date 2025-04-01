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

  public async parternershipForm(req: Request, res: Response): Promise<void> {
    if (
      !(req.files! as any)?.partnershipForm ||
      !(req.files! as any)?.partnershipDeed ||
      !(req.files! as any)?.affidavitConfirmingCopy ||
      !(req.files! as any)?.partnerPanCard ||
      !(req.files! as any)?.partnerAddressProof ||
      !(req.files! as any)?.ownershipDocument ||
      !(req.files! as any)?.businessAddressProof
    ) {
      sendErrorResponse(
        res,
        "Aadhaar card, PAN, ID card, Bank passbook page, Address proof, Rental agreement, NOC, GST certificate are required",
        null,
        200
      );
      return;
    }

    try {
      const userData = (req as any).user;
      await BRISService.parternershipForm(
        req.files! as Record<string, Express.Multer.File[]>,
        userData,
        req.body
      );
      return sendSuccessResponse(
        res,
        "Documents submitted successfully! Pls wait for approval."
      );
    } catch (error) {
      console.log("====parternershipForm====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 200);
    }
  }

  public async opcRegistration(req: Request, res: Response): Promise<void> {
    if (
      !(req.files! as any)?.directorPanCard ||
      !(req.files! as any)?.identityProof ||
      !(req.files! as any)?.addressProof ||
      !(req.files! as any)?.registeredOfficeProof ||
      !(req.files! as any)?.noc ||
      !(req.files! as any)?.photograph ||
      !(req.files! as any)?.moa ||
      !(req.files! as any)?.aoa
    ) {
      sendErrorResponse(
        res,
        "Director Pan Card, Identity Proof, Address Proof, Registered Office Proof, NOC, Photograph, MOA, AOA are required",
        null,
        200
      );
      return;
    }

    try {
      const userData = (req as any).user;
      await BRISService.opcRegistration(
        req.files! as Record<string, Express.Multer.File[]>,
        userData,
        req.body
      );
      return sendSuccessResponse(
        res,
        "Documents submitted successfully! Pls wait for approval."
      );
    } catch (error) {
      console.log("====opcRegistration====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 200);
    }
  }
}
