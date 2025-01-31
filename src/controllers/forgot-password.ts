import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { OtpGenerator } from "../services/otp.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { hashPassword, verifyPassword } from "../utils/utils";

const loginService = new LoginService();
const otpGenerator = new OtpGenerator();
export class ForgotPasswordController {
  constructor() {} // private otpGenerator = new OtpGenerator()


  /**
   * Sends an OTP to the user's phone number. This is the first step in the
   * forgot password flow. The OTP is valid for 5 minutes.
   * @param req The express request object.
   * @param res The express response object.
   * @throws A 400 error if the user is not found.
   * @throws A 401 error if the OTP cannot be sent.
   */
  public async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const { phone_no } = req.body;
      const userData = await loginService.getUser(phone_no);
      if (!userData || userData.length == 0) {
        return sendErrorResponse(res, "User not found", null, 400);
      }
      const otp = otpGenerator.generateOtp();
      let message = `Your OTP is ${otp} Please do not share with anyone. It will expire in 5 minutes.`;
      const otpRes = await otpGenerator.sendOtp(userData[0], message, otp);
      return sendSuccessResponse(res, "Otp Sent successfully", {
        phone_no: phone_no,
      });
    } catch (error: any) {
      console.log("=====forgotPassword====");
      console.log(error);
      return sendErrorResponse(res, error?.message, error, 401);
    }
  }


  /**
   * Resets the user's password using an OTP verification.
   * 
   * This function verifies the OTP sent to the user's phone number,
   * hashes the new password, and updates it in the database.
   * 
   * @param req The express request object containing phone_no, otp, and new_password in the body.
   * @param res The express response object.
   * @returns A success response if the password is reset successfully, otherwise an error response.
   * @throws A 400 error if the user is not found or the OTP is invalid.
   * @throws A 401 error if an error occurs while processing the request.
   */

  public async setForgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const { phone_no, otp, new_password } = req.body;
      const userData = await loginService.getUser(phone_no);
      if (!userData || userData.length == 0) {
        return sendErrorResponse(res, "User not found", null, 400);
      }
      const verify = await otpGenerator.verifyOtp(userData[0], otp);
      if (!verify) return sendErrorResponse(res, "Invalid OTP", null, 400);
      
      const { salt, hash } = hashPassword(new_password);
      const data = await loginService.updatePassword(phone_no, hash, salt);
      delete data.password;
      delete data.password_salt;
      return sendSuccessResponse(res, "Password reset successfully", { data });
    } catch (error: any) {
      console.log("=====setForgotPassword====");
      console.log(error);
      return sendErrorResponse(res, error?.message, error, 401);
    }
  }
}
