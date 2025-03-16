import StaffRepository from "../../repository/staff/staff";

export class StaffService {
  constructor(
    private servicesRepo = new StaffRepository()
  ) {}

  public async getStaffDashboard(data: any): Promise<any> {
    return await this.servicesRepo.getStaffDashboard(data);
  }

//   public async getSubServices(id: number): Promise<any> {
//     return await this.servicesRepo.getSubServices(id);
//   }
}
