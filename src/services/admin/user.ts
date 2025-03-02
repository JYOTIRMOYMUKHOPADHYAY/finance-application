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
      return groupApplicationsByService(data);
    } catch (error) {
      throw error;
    }
  }

  public async getNewServicesSubmission(): Promise<any> {
    try {
      const data = await this.staffRepo.getNewServicesSubmission();
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


  public async getServicesSubmisson(userData:any): Promise<any> {
    try {
      const data = await this.staffRepo.getServicesSubmisson(userData.user_id);
      return groupApplicationsByService(data);
    } catch (error) {
      throw error;
    }
  }

}
