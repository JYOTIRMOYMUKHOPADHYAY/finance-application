import StaffRepository from "../../repository/staff/staff";

export class StaffService {
  constructor(
    private servicesRepo = new StaffRepository()
  ) {}

  public async getAllStaffDashboard(data: any): Promise<any> {
    return await this.servicesRepo.getAllStaffDashboard(data);
  }
  public async getStaffDashboard(data: any): Promise<any> {
    return await this.servicesRepo.getStaffDashboard(data);
  }

  public async approveRejectServicesSubmission(
    isApproved: boolean | string,
    requestId: number
  ): Promise<any> {
    const data = await this.servicesRepo.approveRejectServicesSubmission(isApproved,requestId);
    if(data && data[0].periodid == 1){
      await this.servicesRepo.removeStaffCustomerMapping(data[0].user_id,data[0].service_id)
    }
    return data
  }
}
