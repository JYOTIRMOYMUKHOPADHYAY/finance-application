import BRISopcRegistrationDetailsRepository from "../../repository/bsris/opc-registration";
import BRISParternershipFormRepository from "../../repository/bsris/parternership-form";
import BRISSoleProprietorshipRepository from "../../repository/bsris/sole-proprietorship";
import { AWSService } from "../AWS.service";
import archiver from 'archiver';
export class BusinessRegistrationIncorporationService {
  constructor(
    private awsService = new AWSService(),
    private soleProprietorshipRepo = new BRISSoleProprietorshipRepository(),
    private parternershipFormRepo = new BRISParternershipFormRepository(),
    private opcRegistrationRepo = new BRISopcRegistrationDetailsRepository()
  ) {}

  public async soleProprietorship(
    files: Record<string, Express.Multer.File[]>,
    fieldData: any,
    userData: any
  ): Promise<any> {
    try {
      const uploadData = await this.uploadMultipleFilesToS3(files, userData.user_id);
      const registrationDetails = {
        userId: userData.user_id,
        serviceId: fieldData?.serviceId,
        subServiceId: fieldData?.subServiceId,
        mobileNo: fieldData?.mobileNo,
        mailId: fieldData?.mailId,
        periodId: fieldData?.periodId,
        message: fieldData?.message,
        fileLink: uploadData.zipFile,
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

  public async opcRegistration(
    files: Record<string, Express.Multer.File[]>,
    userData: any,
    fieldData: any
  ): Promise<any> {
    try {
      const data = await this.uploadMultipleFilesToS3(files, userData);
      const opcRegistrationDetails = {
        userId: userData.user_id,
        subServiceId: fieldData?.subServiceId,
        addressProof: data?.addressProof,
        identityProof: data?.identityProof,
        noc: data?.noc,
        registeredOfficeProof: data?.registeredOfficeProof,
        photograph: data?.photograph,
        aoa: data?.aoa,
        moa: data?.moa,
        directorPanCard: data?.directorPanCard,
      };
      return await this.opcRegistrationRepo.opcRegistration(
        opcRegistrationDetails
      );
    } catch (error) {
      console.log("====Service Error: opcRegistration====");
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
        userData.user_id
      );
    } catch (error) {
      console.log("====Service Error: uploadMultipleFilesToS3====");
      console.log(error);
      throw error;
    }
  }
}
