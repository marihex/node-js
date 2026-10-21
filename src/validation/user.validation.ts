import Joi from "joi";

export class UserValidation {
  public createUserSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(0).max(100).required(),
    phone: Joi.string().max(10).optional(),
  });

  public updateUserSchema = Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6),
    age: Joi.number().integer().min(0).max(100),
    phone: Joi.string().max(10),
  }).min(1);
}

export const userValidation = new UserValidation();
