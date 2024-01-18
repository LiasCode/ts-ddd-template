import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { UserInMemoryRepository } from "../../../../../Contexts/BackOffice/User/infrastructure/UserInMemoryRepository";
import { z } from "zod";
import { UserLogger } from "../../../../../Contexts/BackOffice/User/application/UserLogger";
import jwt from "jsonwebtoken";

export class UserPostLogger implements Controller {
  private bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  constructor() {
    this.action = this.action.bind(this);
  }

  private async action(req: Request, res: Response): Promise<void> {
    const body = this.parseBody(req.body);

    if (!body) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid Body" });
      return;
    }

    const newUser = await new UserLogger(new UserInMemoryRepository()).run(
      body.email,
      body.password
    );

    if (!newUser) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Can't Login User" });
      return;
    }

    const token = jwt.sign(newUser.getId().value, "secret");

    res.cookie("auth-user-token", token);

    res.status(StatusCodes.OK).json({
      success: true,
      data: newUser.toPrimitivesSafeData(),
      size: 0,
    });
  }

  private parseBody(body: any): { email: string; password: string } | null {
    const bodyParsed = this.bodySchema.safeParse(body);
    if (!bodyParsed.success) return null;
    return bodyParsed.data;
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
