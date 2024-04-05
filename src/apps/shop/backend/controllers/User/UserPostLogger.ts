import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { z } from "zod";
import { UserLogger } from "../../../../../Contexts/Shop/User/application/UserLogger";
import { UserAuthToken } from "../../../../../Contexts/Shop/User/infrastructure/UserAuthToken";
import { UserRepository } from "../../../../../Contexts/Shop/User/domain/UserRepository";

export class UserPostLogger implements Controller {
  private readonly bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  constructor(private readonly userRepository: UserRepository) {
    this.action = this.action.bind(this);
  }

  private async action(req: Request, res: Response): Promise<void> {
    const body = this.parseBody(req.body);

    if (!body) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid Body" });
      return;
    }

    const user = await new UserLogger(this.userRepository).run(body.email, body.password);

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Can't Login User" });
      return;
    }

    const token = await UserAuthToken.createJWT(user);

    res.cookie(UserAuthToken.getCookieName(), token);

    res.status(StatusCodes.OK).json({
      success: true,
      data: user.toPrimitivesSafeData(),
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
