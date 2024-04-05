import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { UserCreator } from "../../../../../Contexts/Shop/User/application/UserCreator";
import { z } from "zod";
import { UserRepository } from "../../../../../Contexts/Shop/User/domain/UserRepository";

export class UserPostCreate implements Controller {
  private readonly bodySchema = z.object({
    name: z.string(),
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

    const newUser = await new UserCreator(this.userRepository).run(
      body.name,
      body.email,
      body.password
    );

    if (!newUser) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Can't Create User" });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: newUser.toPrimitivesSafeData(),
      size: 0,
    });
  }

  private parseBody(body: any): { name: string; email: string; password: string } | null {
    const bodyParsed = this.bodySchema.safeParse(body);
    if (!bodyParsed.success) return null;
    return bodyParsed.data;
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
