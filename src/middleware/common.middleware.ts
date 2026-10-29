import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.errors.js";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("User not found", 404);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = schema.validate(req.body, {
          abortEarly: false,
          allowUnknown: false,
          convert: true,
        });

        if (error) {
          throw new ApiError(
            error.details.map((detail) => detail.message).join(", "),
            400,
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
