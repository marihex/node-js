import type { NextFunction, Request, Response } from "express";

import type { ISignIn, IUser } from "../interfaces/user.interface.js";
import { authService } from "../services/auth.service.js";

class AuthController {
  public async singUp(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const dto = request.body as IUser;
      const result = await authService.signUp(dto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async signIn(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const dto = request.body as ISignIn;
      const result = await authService.signIn(dto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
