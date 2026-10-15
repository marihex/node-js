import type { NextFunction, Request, Response } from "express";

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

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
