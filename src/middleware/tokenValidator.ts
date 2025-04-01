import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/token.service";
import { sendErrorResponse, sendSuccessResponse } from "./responseHandeler";
import { USERTYPE_ID } from "../globalVariable";

const tokenService = new TokenService();
export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get token from header
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }
  try {
    const decoded = tokenService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return sendErrorResponse(
        res,
        "Token expired. Please log in again.",
        error,
        200
      );
    }
    if (error.name === "JsonWebTokenError") {
      //   res.status(403).json({ message: "Invalid token. Access denied." });
      return sendErrorResponse(
        res,
        "Invalid token. Access denied.",
        error,
        200
      );
    }
    // res.status(403).json({ message: "Authentication failed." });
    return sendErrorResponse(res, "Authentication failed.", error, 200);
  }
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if ((req as any).user?.usertype_id == USERTYPE_ID.ADMIN) {
      next();
    } else {
      sendSuccessResponse(res, "Access Denied. Not an Admin.", null, 403);
    }
  } catch (error: any) {
    console.error("JWT Error:", error.message);
    // res.status(403).json({ message: "Authentication failed." });
    return sendErrorResponse(
      res,
      "Unauthorized. Authentication failed.",
      error,
      200
    );
  }
};
