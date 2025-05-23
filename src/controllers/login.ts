import { Request, Response } from "express";
import { verifyPassword } from "../utils/utils";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../middleware/responseHandeler";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user";

// const loginService = new LoginService();
const userService = new UserService();
const tokenService = new TokenService();
export class LoginController {
  constructor() {}

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { phone_no, password } = req.body;
      const userData: any[] = await userService.getUser(phone_no);
      if(!userData) return sendErrorResponse(res, "User not found", null, 200);
      const verify = verifyPassword(
        password,
        userData[0].password,
        userData[0].password_salt
      );
      delete userData[0].password;
      delete userData[0].password_salt;
      if (verify) {
        const token = tokenService.generateToken(userData[0]);
        const refreshToken = tokenService.generateRefreshToken(userData[0]);
        userData[0].token = token;
        userData[0].refreshToken = refreshToken;
        return sendSuccessResponse(res, "User login successfully", userData[0]);
      }
      return sendErrorResponse(res, "Invalid credentials", null, 200);
    } catch (error) {
      console.log("=====login====");
      console.log(error);
      return sendErrorResponse(res, "Invalid credentials", error, 200);
    }
  }

  public async generateRefreshToken(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body;
      const userRefreshTokenDate =
        tokenService.verifyRefreshToken(refreshToken);
      const userData: any[] = await userService.getUser(
        userRefreshTokenDate.phone_no
      );
      delete userData[0].password;
      delete userData[0].password_salt;
      const token = tokenService.generateToken(userData[0]);
      const refreshTokenData = tokenService.generateRefreshToken(userData[0]);
      userData[0].token = token;
      userData[0].refreshToken = refreshTokenData;
      return sendSuccessResponse(
        res,
        "Refresh token generated successfully",
        userData[0]
      );
    } catch (error) {
      console.log("=====generateRefreshToken====");
      console.log(error);
      return sendErrorResponse(res, "Invalid credentials", error, 200);
    }
  }
}
