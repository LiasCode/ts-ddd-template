import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { GlobalRouter } from "./router";
import cookieParser from "cookie-parser";

// --------- SETUP APP -------------
export const App: Application = express();

// ---------- APP SETTINGS ------------
App.set("PORT", process.env.PORT || 3030);
App.disable("x-powered-by");

// ---------- MIDDLEWARES ---------
App.use(compression());
App.use(helmet());
App.use(morgan("dev"));
App.use(cors());
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(bodyParser.text());
App.use(bodyParser.raw());
App.use(cookieParser());

// ------------- ROUTER ------------
App.use("/", GlobalRouter);

App.once("error", (error) => {
  console.error({ error });
});

App.on("uncaughtException", (error) => {
  console.error({ uncaughtException: error });
});
