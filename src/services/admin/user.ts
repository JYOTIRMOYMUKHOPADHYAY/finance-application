import { USERTYPE_ID } from "../../globalVariable";
import UserRepository from "../../repository/admin/user";
import { groupApplicationsByService } from "../../utils/utils";

export class StaffUserService {
  constructor(
    private staffRepo = new UserRepository()
  ) {}
  public async updateStaff(staffUser: any, adminUser:any): Promise<any> {
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

  public async getServicesSubmission(flag?: boolean): Promise<any> {
    try {
      const data = await this.staffRepo.getAllServicesSubmission()
      return groupApplicationsByService(data);
    } catch (error) {
      throw error;
    }
  }

}
