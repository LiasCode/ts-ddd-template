import { Request, Response } from "express";

export type ControllerAction = (req: Request, res: Response) => Promise<void>;

export interface Controller {
  getController: () => ControllerAction;
}
