import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { GlobalRouter } from "./router";
import cookieParser from "cookie-parser";

// --------- SETUP APP -------------
export const ShopApp: Application = express();

// ---------- APP SETTINGS ------------
ShopApp.set("PORT", process.env.PORT || 3030);
ShopApp.disable("x-powered-by");

// ---------- MIDDLEWARES ---------
ShopApp.use(compression());
ShopApp.use(helmet());
ShopApp.use(morgan("dev"));
ShopApp.use(cors());
ShopApp.use(bodyParser.urlencoded({ extended: false }));
ShopApp.use(bodyParser.json());
ShopApp.use(bodyParser.text());
ShopApp.use(bodyParser.raw());
ShopApp.use(cookieParser());

// ------------- ROUTER ------------
ShopApp.use("/", GlobalRouter);

ShopApp.once("error", (error) => {
  console.error({ error });
});

ShopApp.on("uncaughtException", (error) => {
  console.error({ uncaughtException: error });
});
