import type { NextFunction, Request, Response } from "express";

import type { ITokenPayload } from "../interfaces/token.interfaces.js";
import type { UpdateUserDto } from "../interfaces/updatedUser.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { userService } from "../services/user.services.js";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // public async create(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const dto = req.body as IUser;
  //     const result = await userService.create(dto);
  //     res.status(201).json(result);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      if (typeof userId !== "string") {
        throw new Error("Некорректный userId");
      }
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res?.locals.jwtPayload as ITokenPayload;

      const dto = req.body as IUser;
      const result = await userService.updateMe(jwtPayload, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res?.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async patchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      if (typeof userId !== "string") {
        throw new Error("Некорректный userId");
      }
      const dto = req.body as Partial<UpdateUserDto>;
      const result = await userService.patchUser(userId, dto);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res?.locals.jwtPayload as ITokenPayload;

      const result = await userService.getMe(jwtPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
