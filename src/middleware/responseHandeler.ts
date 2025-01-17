import { Request, Response, NextFunction } from "express";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Success Response Handler
 */
export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  const response: ApiResponse = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

/**
 * Error Response Handler
 */
export const sendErrorResponse = (
  res: Response,
  message: string,
  error: any = null,
  statusCode: number = 500
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error: process.env.NODE_ENV === "production" ? undefined : error, // Hide stack trace in production
  };
  res.status(statusCode).json(response);
};

/**
 * Global Error Middleware
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging
  sendErrorResponse(
    res,
    err.message || "Internal Server Error",
    err,
    err.statusCode || 500
  );

};