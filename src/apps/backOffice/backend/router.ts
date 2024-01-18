import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { StatusRouter } from "./routes/StatusRouter";
import { ErrorController } from "./controllers/ErrorController";
import { UserRouter } from "./routes/UserRouter";

export const GlobalRouter = Router();

// Status
GlobalRouter.use("/", StatusRouter);

// API
GlobalRouter.use("/api/", UserRouter);

// Error Controller Handler
GlobalRouter.use(ErrorController);

GlobalRouter.all("*", (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Not Found" });
});
