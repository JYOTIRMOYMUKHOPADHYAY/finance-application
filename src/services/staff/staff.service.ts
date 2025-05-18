import { STATUS } from "../../globalVariable";
import StaffRepository from "../../repository/staff/staff";

export class StaffService {
  constructor(private staffServicesRepo = new StaffRepository()) {}

  public async getAssignedUserServiceData(data: any): Promise<any> {
    return await this.staffServicesRepo.getAssignedUserServiceData(data);
  }

  public async searchUserServiceReport(data: any): Promise<any> {
    return await this.staffServicesRepo.searchUserServiceReport(data);
  }
  public async getStaffDashboard(data: any): Promise<any> {
    return await this.staffServicesRepo.getStaffDashboard(data);
  }

  public async approveRejectServicesSubmission(
    stafUser: any,
    isAccepted: boolean | string,
    requestId: number,
    isSubmitted?: boolean
  ): Promise<any> {
    const reqDetails = await this.staffServicesRepo.getRequestDetails(requestId);
    const isDataExists = await this.staffServicesRepo.checkUserStaffMapping(
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
      const data = await this.staffServicesRepo.approveRejectServicesSubmission(
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
      const data = await this.staffServicesRepo.approveRejectServicesSubmission(
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
