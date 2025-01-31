import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { verifyPassword } from "../utils/utils";
import { sendErrorResponse, sendSuccessResponse } from "../middleware/responseHandeler";
import { TokenService } from "../services/token.service";




const loginService = new LoginService();
const tokenService = new TokenService();
export class LoginController {
  constructor() {}

  public async getUserTypes(req: Request, res: Response): Promise<void> {
    const userTypes = await loginService.getUserTypes();
    res.status(200).json({
      success: true,
      message: "Success",
      data: userTypes,
    });
  }
  
  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { phone_no, password } = req.body;
    const userData: any[] = await loginService.getUser(phone_no);
    const verify = verifyPassword(password, userData[0].password, userData[0].password_salt)
    delete userData[0].password;
    delete userData[0].password_salt;
    if(verify){
      const token = tokenService.generateToken(userData[0]);
      userData[0].token = token
      return sendSuccessResponse(res, "User login successfully", userData[0]);
    }
    return sendErrorResponse(res, "Invalid credentials", null, 401);
    } catch (error) {
      console.log("=====login====")
      console.log(error)
      return sendErrorResponse(res, "Invalid credentials", error, 401);
    }
  }


}
