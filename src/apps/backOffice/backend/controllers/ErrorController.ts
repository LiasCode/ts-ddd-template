import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const ErrorController = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log("!!!!! ERROR CONTROLLER !!!!!");
  console.error(err); // Log the error for debugging purposes

  // Handle specific types of errors
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({ success: false, message: err.message });
  // }

  // Handle unexpected errors
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: "Internal Server Error" });
};
