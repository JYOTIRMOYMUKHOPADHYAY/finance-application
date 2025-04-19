import { STATUS } from "../../globalVariable";
import StaffRepository from "../../repository/staff/staff";

export class StaffService {
  constructor(private servicesRepo = new StaffRepository()) {}

  public async getAllStaffDashboard(data: any): Promise<any> {
    return await this.servicesRepo.getAllStaffDashboard(data);
  }

  public async searchStaffReport(data: any): Promise<any> {
    return await this.servicesRepo.searchStaffReport(data);
  }
  public async getStaffDashboard(data: any): Promise<any> {
    return await this.servicesRepo.getStaffDashboard(data);
  }

  public async approveRejectServicesSubmission(
    stafUser: any,
    isAccepted: boolean | string,
    requestId: number,
    isSubmitted?: boolean
  ): Promise<any> {
    const reqDetails = await this.servicesRepo.getRequestDetails(requestId);
    const isDataExists = await this.servicesRepo.checkUserStaffMapping(
      reqDetails[0].user_id,
      stafUser.user_id
    );

    if (!isDataExists || isDataExists.length == 0) {
      throw new Error("No data found");
    }
    if (reqDetails[0].status == STATUS.SUBMITTED) {
      throw new Error("Request already submitted.");
    }
    if (reqDetails[0].status != STATUS.ACCEPTED && isSubmitted) {
      throw new Error("Please accept the request first");
    }
    if (!isSubmitted) {
      const data = await this.servicesRepo.approveRejectServicesSubmission(
        isAccepted,
        requestId
      );
      //NEED TO MAKE IT DYNAMIC
      // if (data && data[0].periodid == 1) {
      //   await this.servicesRepo.removeStaffCustomerMapping(
      //     data[0].user_id,
      //     data[0].service_id
      //   );
      // }
      return data;
    }
    if (isSubmitted) {
      const data = await this.servicesRepo.approveRejectServicesSubmission(
        isAccepted,
        requestId,
        isSubmitted
      );
      //NEED TO MAKE IT DYNAMIC
      // if (data && data[0].periodid == 1) {
      //   await this.servicesRepo.removeStaffCustomerMapping(
      //     data[0].user_id,
      //     data[0].service_id
      //   );
      // }
      return data;
    }
    throw new Error("No data found");
  }
}
