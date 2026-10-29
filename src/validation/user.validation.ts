import Joi from "joi";

export class UserValidation {
  public createUserSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(0).max(100).required(),
    phone: Joi.string().max(10).optional(),
  });

  public putUserSchema = Joi.object({
    name: Joi.string().min(4).required(),
    age: Joi.number().integer().min(0).max(100).required(),
    phone: Joi.string().max(10).optional(),
  });

  public patchUserSchema = Joi.object({
    name: Joi.string().min(4),
    age: Joi.number().integer().min(0).max(100),
    phone: Joi.string().max(10),
  }).min(1);
}

export const userValidation = new UserValidation();
