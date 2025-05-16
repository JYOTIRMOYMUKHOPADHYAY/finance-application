import { Request, Response } from "express";
import {
  ApiResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../middleware/responseHandeler";
import { RegisterService } from "../../services/register.service";
import { LoginService } from "../../services/login.service";
import { hashPassword, sanitizeData } from "../../utils/utils";
import { USERTYPE_ID } from "../../globalVariable";
import { StaffUserService } from "../../services/admin/user";

const registerService = new RegisterService();
const loginService = new LoginService();
const staffService = new StaffUserService();
export class CreateReviewerController {
  constructor() {} // private staffService = new StaffUserService()

  public async createReviewer(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const user = await loginService.getUser(req.body.phone_no);
    if (user) {
      return sendErrorResponse(
        res,
        "User already registered with this phone no.",
        null,
        200
      );
    }
    try {
      const { salt, hash } = hashPassword(req.body.password);
      const userData = await registerService.register({
        name: req.body.name,
        email: req.body?.email ? req.body?.email : "",
        phone_no: req.body.phone_no,
        qualification: req.body.qualification,
        experience: req.body.experience,
        service_id: req.body.service_id,
        userType_id: USERTYPE_ID.REVIEWER,
        salt,
        hash,
        created_by: adminUser.user_id,
      });
      delete userData[0].password;
      delete userData[0].password_salt;
      return sendSuccessResponse(
        res,
        "Staff Created successfully.",
        userData[0],
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async updateReviewer(req: Request, res: Response): Promise<void> {
    const adminUser = (req as any).user;
    const reviewerUser = req.body;
    // break;
    const userData = await loginService.getUserById(reviewerUser.reviewer_id);
    if (!userData) {
      return sendErrorResponse(res, "No user Found.", null, 200);
    }
    if (userData[0].phone_no != reviewerUser.phone_no) {
      return sendErrorResponse(
        res,
        "Sorry You cnt change the phone no.",
        null,
        200
      );
    }
    delete reviewerUser.phone_no;
    reviewerUser.staff_id = reviewerUser.reviewer_id;
    try {
      const reviewerData = await staffService.updateStaff(
        reviewerUser,
        adminUser
      );
      delete reviewerData[0].password;
      delete reviewerData[0].password_salt;
      return sendSuccessResponse(
        res,
        "Reviewer Updated successfully.",
        reviewerData[0],
        200
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }

  public async getAllReviewer(req: Request, res: Response): Promise<void> {
    try {
      const reviewerData = await staffService.getUser(USERTYPE_ID.REVIEWER);
      return sendSuccessResponse(res, "Success", reviewerData, 200);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }
}
