import UserRepository from "../../repository/admin/user";

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

}
