export class Logger {
  private logLevel: string;

  constructor(logLevel: "debug" | "info" | "error") {
    this.logLevel = logLevel;
  }

  public log(message: string): void {
    if (this.logLevel === "debug") {
      console.log(`[DEBUG] ${message}`);
    } else if (this.logLevel === "info") {
      console.log(`[INFO] ${message}`);
    } else if (this.logLevel === "error") {
      console.error(`[ERROR] ${message}`);
    }
  }
}
