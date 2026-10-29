import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { ApiError } from "./api.errors.js";

const app = express();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err?.code === 11000) {
    return res.status(409).json({ message: "Email вже зайнятий" });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
