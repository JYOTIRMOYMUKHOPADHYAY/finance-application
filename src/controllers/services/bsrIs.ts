import { Request, Response } from "express";
import { AWSService } from "../../services/AWS.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { BRISSoleProprietorshipService } from "../../services/bsris/bsris.service";

const awsService = new AWSService();
const BRISService = new BRISSoleProprietorshipService();
export class BusinessRergistrationIncorporationController {
  constructor() {}

  public async soleProprietorship(req: Request, res: Response): Promise<void> {
    if (
      !(req.files! as any)?.aadharCard ||
      !(req.files! as any)?.panCard ||
      !(req.files! as any)?.idCard ||
      !(req.files! as any)?.bankPassbookPage ||
      !(req.files! as any)?.addressProof ||
      !(req.files! as any)?.rentalAgreement ||
      !(req.files! as any)?.noc ||
      !(req.files! as any)?.gstCertificate
    ) {
      sendErrorResponse(
        res,
        "Aadhaar card, PAN, ID card, Bank passbook page, Address proof, Rental agreement, NOC, GST certificate are required",
        null,
        400
      );
      return;
    }

    try {
      const userData = (req as any).user;
      const data = await awsService.uploadMultipleFilesToS3(
        req.files! as Record<string, Express.Multer.File[]>,
        `${process.env.AWS_SERVICES_UPLOAD_PATH!}/${process.env
          .AWS_BUSINESS_REGISTRATION_FILE_UPLOAD_PATH!}`,
        userData.user_id.toString()
      );
      const registrationDetails = {
        userId: userData.user_id,
        subServiceId: req.body.subServiceId,
        aadharCard: data?.aadharCard, // File upload (Aadhaar card document)
        panCard: data?.panCard, // File upload (PAN card document)
        idCard: data?.idCard, // File upload (Alternative identity proof)
        bankPassbookPage: data?.bankPassbookPage, // File upload (Bank proof)
        accountNumber: req.body.accountNumber, // String (Bank account number)
        ifscCode: req.body.ifscCode, // String (IFSC code)
        bankName: req.body.bankName, // String (Bank name),
        addressProof: data?.addressProof, // File upload (Business address proof)
        rentalAgreement: data?.rentalAgreement || null, // File upload (if rented)
        noc: data?.noc || null, // File upload (NOC from landlord)
        bills: data?.bills || null, // File upload (Electricity/Utility Bill if owned)
        tradeLicense: data?.tradeLicense || null, // File upload (Trade license if applicable)
        gstNumber: req.body.gstNumber, // String (GST number)
        gstCertificate: data?.gstCertificate, // File upload (GST certificate)
      };
      await BRISService.soleProprietorship(registrationDetails);
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
        400
      );
      return;
    }

    try {
      const userData = (req as any).user;
      const data = await awsService.uploadMultipleFilesToS3(
        req.files! as Record<string, Express.Multer.File[]>,
        `${process.env.AWS_SERVICES_UPLOAD_PATH!}/${process.env
          .AWS_BUSINESS_REGISTRATION_FILE_UPLOAD_PATH!}`,
        userData.user_id.toString()
      );
      console.log(req.body?.dataOfEstablishment);
      console.log(new Date(`${req.body?.dataOfEstablishment}`));
      const parternershipFormDetails = {
        userId: userData.user_id,
        subServiceId: req.body?.subServiceId,
        partnershipForm: data?.partnershipForm, // File upload (Aadhaar card document)
        partnershipDeed: data?.partnershipDeed, // File upload (PAN card document)
        affidavitConfirmingCopy: data?.affidavitConfirmingCopy,
        partnerPanCard: data?.partnerPanCard,
        partnerAddressProof: data?.partnerAddressProof,
        ownershipDocument: data?.ownershipDocument,
        businessAddressProof: data?.businessAddressProof,
        firmName: req.body?.firmName,
        businessType: req.body?.businessType,
        dataOfEstablishment: new Date(req.body?.dataOfEstablishment),
        placeOfBusiness: req.body?.placeOfBusiness,
        ownershipType: req.body?.ownershipType,
      };
      console.log(parternershipFormDetails);
      await BRISService.parternershipForm(parternershipFormDetails);
      return sendSuccessResponse(
        res,
        "Documents submitted successfully! Pls wait for approval."
      );
    } catch (error) {
      console.log("====parternershipForm====");
      console.log(error);
      sendErrorResponse(res, "Invalid data", error, 401);
    }
  }
}
