import { USERTYPE_ID } from "../../globalVariable";
import UserRepository from "../../repository/admin/user";
import { groupApplicationsByService } from "../../utils/utils";

export class StaffUserService {
  constructor(private staffRepo = new UserRepository()) {}

  public async updateStaff(staffUser: any, adminUser: any): Promise<any> {
    try {
      return await this.staffRepo.updateUser(staffUser, adminUser.user_id);
    } catch (error) {
      throw error;
    }
  }

  public async getUser(userType: number): Promise<any> {
    try {
      return await this.staffRepo.geteUser(userType);
    } catch (error) {
      throw error;
    }
  }

  public async getAllServicesSubmission(): Promise<any> {
    try {
      const data = await this.staffRepo.getAllServicesSubmission();
      const statusData = Object.entries(this.getStatusCounts(data)).map(([status, count]) => ({
        status,
        count
      }));
      return {data,statusData};
    } catch (error) {
      throw error;
    }
  }

  private getStatusCounts(data: any) {
    return data.reduce((acc: any, item: any) => {
      const status = item.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  } 
  public async getNewServicesSubmission(): Promise<any> {
    try {
      const data = await this.staffRepo.getNewServicesSubmission();
      // const staffData = await this.staffRepo.getstaffMappingDetails(10010);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async approveRejectServicesSubmission(
    isApproved: boolean,
    requestId: number
  ): Promise<any> {
    try {
      const data = await this.staffRepo.approveRejectServicesSubmission(
        isApproved,
        requestId
      );
      return groupApplicationsByService(data);
    } catch (error) {
      throw error;
    }
  }

  public async getServicesSubmisson(userData: any): Promise<any> {
    try {
      const data = await this.staffRepo.getServicesSubmisson(userData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async mapStaffCustomer(
    customerId: number,
    staffId: number,
    service_id: number,
    requestId: number,
    admin_id: number
  ): Promise<any> {
    try {
      const data = await this.staffRepo.mapStaffUser(
        customerId,
        staffId,
        service_id,
        requestId,
        admin_id
      );
      return data;
    } catch (error) {
      throw error;
    }
  }


  public async searchReports(
    status: string,
    service_id: number,
    staff_id: number
  ): Promise<any> {
    try {
      const data = await this.staffRepo.searchReports(
        status,
        service_id,
        staff_id
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
