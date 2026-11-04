import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { userValidation } from "../validation/user.validation.js";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(userValidation.createUserSchema),
  authController.singUp,
);

router.post("/sign-in", authController.signIn);

export const authRouter = router;
