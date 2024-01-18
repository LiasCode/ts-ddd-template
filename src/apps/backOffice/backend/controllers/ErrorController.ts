import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../Logger";

export const ErrorController = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error("!!!!! ERROR CONTROLLER !!!!!");
  logger.error(err.message);

  // Handle specific types of errors
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({ success: false, message: err.message });
  // }

  // Handle unexpected errors
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: "Internal Server Error" });
};
