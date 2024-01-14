import { Logger } from "./Logger";
import "./envConfig";

import { App } from "./server-app";
// ----------- INIT SERVER ---------
const logger = new Logger("error");

App.listen(App.get("PORT"), () => {
  logger.log("Server listen on PORT: " + App.get("PORT"));
});

process.on("uncaughtException", (error) => {
  console.error({ uncaughtException: error });
});
