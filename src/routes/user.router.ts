import { Router } from "express";

import { userController } from "../controllers/user.controller.js";
import { commonMiddleware } from "../middleware/common.middleware.js";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

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
  userController.update,
);
// router.patch("/:userId", userController.patchUser);

export const userRouter = router;
