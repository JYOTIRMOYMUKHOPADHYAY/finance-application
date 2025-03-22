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
    return await this.servicesRepo.approveRejectServicesSubmission(isApproved,requestId);
  }
}
