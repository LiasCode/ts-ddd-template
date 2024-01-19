import http from "node:http";
import "./envConfig";
import { logger } from "./Logger";
import { ShopApp } from "./ShopApp";

// ----------- INIT SERVER ---------
http.createServer(ShopApp).listen(ShopApp.get("PORT"), () => {
  logger.info("Server listen on PORT: " + ShopApp.get("PORT"));
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception : ${error.message}`);
});
