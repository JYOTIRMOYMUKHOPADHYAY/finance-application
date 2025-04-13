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
    isApproved: boolean | string,
    requestId: number
  ): Promise<any> {
    const reqDetails = await this.servicesRepo.getRequestDetails(requestId);
    const isDataExists = await this.servicesRepo.checkUserStaffMapping(
      reqDetails[0].user_id,
      stafUser.user_id
    );
    if (isDataExists && isDataExists.length > 0) {
      const data = await this.servicesRepo.approveRejectServicesSubmission(
        isApproved,
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
    throw new Error("No data found");
  }
}
