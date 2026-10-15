import { Router } from "express";

import { userController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getById);
router.delete("/:userId", userController.delete);
router.put("/:userId", userController.update);
router.patch("/:userId", userController.patchUser);

export const userRouter = router;
