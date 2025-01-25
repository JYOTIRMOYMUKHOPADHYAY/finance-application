import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { OtpGenerator } from "../services/otp.service";




const loginService = new LoginService();
const otpGenerator = new OtpGenerator()
export class ForgotPasswordController {
  constructor(
    // private otpGenerator = new OtpGenerator()
  ) {}
  
  public async forgotPassword(req: Request, res: Response): Promise<any> {
    // try {
      const { phone_no } = req.body;
        console.log(otpGenerator.generateOtp())
      // const userData: any[] = await loginService.getUser(phone_no);
    // const verify = verifyPassword(password, userData[0].password, userData[0].password_salt)
    // delete userData[0].password;
    // delete userData[0].password_salt;
    // if(verify){
    //   return sendSuccessResponse(res, "User login successfully", userData[0]);
    // }
    // return sendErrorResponse(res, "Invalid credentials", null, 401);
    // } catch (error) {
    //   return sendErrorResponse(res, "Invalid credentials", error, 401);
    // }
  }


}
