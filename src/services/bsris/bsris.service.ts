import BRISParternershipFormRepository from "../../repository/bsris/parternership-form";
import BRISSoleProprietorshipRepository from "../../repository/bsris/sole-proprietorship";
import { AWSService } from "../AWS.service";

export class BusinessRegistrationIncorporationService {
  constructor(
    private awsService = new AWSService(),
    private soleProprietorshipRepo = new BRISSoleProprietorshipRepository(),
    private parternershipFormRepo = new BRISParternershipFormRepository()
  ) {}

  public async soleProprietorship(
    files: Record<string, Express.Multer.File[]>,
    userData: any,
    fieldData: any
  ): Promise<any> {
    try {
      const uploadData = await this.uploadMultipleFilesToS3(files, userData);
      const registrationDetails = {
        userId: userData.user_id,
        subServiceId: fieldData?.subServiceId,
        aadharCard: uploadData?.aadharCard,
        panCard: uploadData?.panCard,
        idCard: uploadData?.idCard,
        bankPassbookPage: uploadData?.bankPassbookPage,
        accountNumber: fieldData?.accountNumber,
        ifscCode: fieldData?.ifscCode,
        bankName: fieldData?.bankName,
        addressProof: uploadData?.addressProof,
        rentalAgreement: uploadData?.rentalAgreement || null,
        noc: uploadData?.noc || null,
        bills: uploadData?.bills || null,
        tradeLicense: uploadData?.tradeLicense || null,
        gstNumber: fieldData?.gstNumber,
        gstCertificate: uploadData?.gstCertificate,
      };

      return await this.soleProprietorshipRepo.soleProprietorship(
        registrationDetails
      );
    } catch (error) {
      console.log("====Service Error: soleProprietorship====");
      console.log(error);
      throw error;
    }
  }
  public async parternershipForm(
    files: Record<string, Express.Multer.File[]>,
    userData: any,
    fieldData: any
  ): Promise<any> {
    try {
      const data = await this.uploadMultipleFilesToS3(files, userData);
      const parternershipFormDetails = {
        userId: userData.user_id,
        subServiceId: fieldData?.subServiceId,
        partnershipForm: data?.partnershipForm, // File upload (Aadhaar card document)
        partnershipDeed: data?.partnershipDeed, // File upload (PAN card document)
        affidavitConfirmingCopy: data?.affidavitConfirmingCopy,
        partnerPanCard: data?.partnerPanCard,
        partnerAddressProof: data?.partnerAddressProof,
        ownershipDocument: data?.ownershipDocument,
        businessAddressProof: data?.businessAddressProof,
        firmName: fieldData?.firmName,
        businessType: fieldData?.businessType,
        dataOfEstablishment: new Date(fieldData?.dataOfEstablishment),
        placeOfBusiness: fieldData?.placeOfBusiness,
        ownershipType: fieldData?.ownershipType,
      };
      return await this.parternershipFormRepo.parternershipForm(
        parternershipFormDetails
      );
    } catch (error) {
      console.log("====Service Error: parternershipForm====");
      console.log(error);
      throw error;
    }
  }

  private async uploadMultipleFilesToS3(
    files: Record<string, Express.Multer.File[]>,
    userData: any
  ): Promise<any> {
    try {
      return await this.awsService.uploadMultipleFilesToS3(
        files! as Record<string, Express.Multer.File[]>,
        `${process.env.AWS_SERVICES_UPLOAD_PATH!}/${process.env
          .AWS_BUSINESS_REGISTRATION_FILE_UPLOAD_PATH!}`,
        userData.user_id.toString()
      );
    } catch (error) {
      console.log("====Service Error: uploadMultipleFilesToS3====");
      console.log(error);
      throw error;
    }
  }
}
