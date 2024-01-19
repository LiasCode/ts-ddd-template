import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { NextFunction, Request, Response } from "express";
import { UserByIdFinder } from "../../../../../Contexts/Shop/User/application/UserByIdFinder";
import { UserAuthToken } from "../../../../../Contexts/Shop/User/infrastructure/UserAuthToken";
import { UserId } from "../../../../../Contexts/Shop/User/domain/UserId";
import { UserRepository } from "../../../../../Contexts/Shop/User/domain/UserRepository";

export class UserAuthController implements Controller {
  constructor(private readonly userRepository: UserRepository) {
    this.action = this.action.bind(this);
  }

  private async action(req: Request, res: Response, next?: NextFunction): Promise<void> {
    let authToken: string | null = null;

    authToken = await this.extractUserAuthorizationIdToken(req);

    if (!authToken) {
      authToken = await this.extractUserCookieIdToken(req);
    }

    if (!authToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const userTokenPayLoad = await UserAuthToken.validateJWT(authToken);

    if (!userTokenPayLoad) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const user = await new UserByIdFinder(this.userRepository).run(
      new UserId(userTokenPayLoad.userId)
    );

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (next) {
      next();
    }
  }

  private async extractUserAuthorizationIdToken(req: Request): Promise<string | null> {
    const token = req.headers.authorization?.split(" ");

    if (!token) {
      return null;
    }

    if (token[0] !== "Bearer") {
      return null;
    }

    if (!token[1]) {
      return null;
    }

    return token[1];
  }

  private async extractUserCookieIdToken(req: Request): Promise<string | null> {
    const token = req.cookies[UserAuthToken.getCookieName()];

    if (!token) {
      return null;
    }

    return token;
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
