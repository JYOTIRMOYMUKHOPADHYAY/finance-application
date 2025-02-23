import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { RegisterService } from "../../services/register.service";
import { LoginService } from "../../services/login.service";
import { hashPassword } from "../../utils/utils";
import { USERTYPE_ID } from "../../globalVariable";
import { StaffUserService } from "../../services/admin/staff-user";

const registerService = new RegisterService();
const loginService = new LoginService();
const staffService = new StaffUserService();
export class CreateStaffController {
  constructor() // private staffService = new StaffUserService()
  {}

  public async createStaff(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const user = await loginService.getUser(req.body.phone_no);
    if (user) {
      return sendErrorResponse(res, "User Already Exists.", null, 400);
    }
    try {
      const { salt, hash } = hashPassword(req.body.password);
      const userData = await registerService.register({
        name: req.body.name,
        email: req.body?.email ? req.body?.email : "",
        phone_no: req.body.phone_no,
        userType_id: USERTYPE_ID.STAFF,
        salt,
        hash,
        created_by: adminUser.user_id,
      });
      delete userData[0].password;
      delete userData[0].password_salt;
      return sendSuccessResponse(
        res,
        "User register successfully",
        userData[0],
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 400);
    }
  }

  public async updateStaff(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const staffUser = req.body;
    try {
      const staffData = await staffService.updateStaff(staffUser, adminUser);
      delete staffData[0].password;
      delete staffData[0].password_salt;
      console.log(staffData);
      return sendSuccessResponse(
        res,
        "User register successfully",
        staffData[0],
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 400);
    }
  }
}
