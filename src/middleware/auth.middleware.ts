import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.errors.js";
import { tokenRepository } from "../repositories/token.repositories.js";
import { tokenService } from "../services/token.service.js";

class AuthMiddlewares {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided.", 401);
      }
      const accessToken = header.split("Bearer ")[1];

      if (!accessToken) {
        throw new ApiError("Token is not provided", 401);
      }

      const payload = tokenService.verifyToken(accessToken);
      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Token is not provided", 401);
      }

      req.res!.locals.jwtPayload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const authMiddleware = new AuthMiddlewares();
