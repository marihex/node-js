import { Router } from "express";

import { userController } from "../controllers/user.controller.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { userValidation } from "../validation/user.validation.js";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(userValidation.createUserSchema),
  userController.create,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userValidation.putUserSchema),
  userController.update,
);
router.patch(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userValidation.patchUserSchema),
  userController.patchUser,
);

export const userRouter = router;
