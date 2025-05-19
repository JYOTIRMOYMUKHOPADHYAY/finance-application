import { STATUS } from "../../globalVariable";
import UserRepository from "../../repository/admin/user";
import { groupApplicationsByService } from "../../utils/utils";

export class AdminService {
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
      const statusData = this.getFullStatusCounts(data);
      return { data, statusData };
    } catch (error) {
      throw error;
    }
  }

  private getFullStatusCounts(data: any) {
    const newStatus = { ...STATUS } as Record<string, string>;
    delete newStatus.PENDING;
    const counts = Object.fromEntries(
      Object.values(newStatus).map((status) => [status, 0])
    );

    data.forEach((item: any) => {
      if (counts.hasOwnProperty(item.status)) {
        counts[item.status]++;
      }
    });

    return Object.entries(counts).map(([status, count]) => ({ status, count }));
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
    requestId: number,
    adminUser: any
  ): Promise<any> {
    try {
      const data = await this.staffRepo.approveRejectServicesSubmission(
        isApproved,
        requestId,
        adminUser
      );
      return groupApplicationsByService(data);
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
