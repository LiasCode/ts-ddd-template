import Router from "express-promise-router";
import { StatusGetDbConnections } from "../controllers/StatusGetDbConnections";

export const StatusRouter = Router();

StatusRouter.use("/actuator/health", new StatusGetDbConnections().getController());

StatusRouter.use("/health", new StatusGetDbConnections().getController());

StatusRouter.use("/status", new StatusGetDbConnections().getController());
