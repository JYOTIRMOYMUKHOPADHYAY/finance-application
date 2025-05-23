import CustomerRepository from "../repository/customer";
import { AWSService } from "./AWS.service";

export class CustomerService {
  constructor(
    private awsService = new AWSService(),
    private customerRepo = new CustomerRepository()
  ) {}

  public async serviceSubmission(
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
      return await this.customerRepo.serviceSubmission(
        registrationDetails,
        userData
      );
    } catch (error) {
      console.log("====Service Error: soleProprietorship====");
      console.log(error);
      throw error;
    }
  }


  public async getServicesSubmisson(userData: any): Promise<any> {
    try {
      const data = await this.customerRepo.getServicesSubmisson(userData);
      return data;
    } catch (error) {
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
