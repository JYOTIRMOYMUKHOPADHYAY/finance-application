import { Request, Response } from "express";
import { hashPassword } from "../utils/utils";
import { LoginService } from "../services/login.service";
import { RegisterService } from "../services/register.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";

const loginService = new LoginService();
const registerService = new RegisterService();
export class RegisterController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone_no, email, userType_id } = req.body;
      const user = await loginService.getUser(phone_no);
      if (user) {
        return sendErrorResponse(res, "User Already Exists.", null, 400);
      }
      const { salt, hash } = hashPassword(req.body.password);
      const userData = await registerService.register({
        name,
        email: email ? email : "",
        phone_no,
        userType_id: userType_id ? userType_id : 1,
        salt,
        hash,
      });
      delete userData[0].password;
      delete userData[0].password_salt;
      return sendSuccessResponse(
        res,
        "User register successfully",
        userData[0],
        200
      );
    } catch (error:any) {
      return sendErrorResponse(res, error.message, error, 400);
    }
  }
}
