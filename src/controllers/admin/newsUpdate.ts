import { Request, Response } from "express";
import { sendErrorResponse } from "../../middleware/responseHandeler";
import { UpdateNewsService } from "../../services/admin/newsUpdate";

const newsService = new UpdateNewsService();
export class UpdateNewsController {
  constructor() {} // private staffService = new StaffUserService()

  public async newsUpdatesData(req: Request, res: Response): Promise<void> {
    try {
      const newsData = await newsService.createNewsService(
        req.body.message,
        (req as any).user
      );
      const response: any = {
        success: true,
        message: "Success",
        data: newsData,
      };
      res.status(200).json(response);
    } catch (error: any) {
      return sendErrorResponse(res, error.message, error, 200);
    }
  }
}
