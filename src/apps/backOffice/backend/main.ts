import { logger } from "./Logger";
import "./envConfig";

import { App } from "./server-app";
// ----------- INIT SERVER ---------

App.listen(App.get("PORT"), () => {
  logger.info("Server listen on PORT: " + App.get("PORT"));
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception : ${error.message}`);
});
