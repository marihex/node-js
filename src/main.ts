import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config.js";
import { ApiError } from "./errors/api.errors.js";
import { userRouter } from "./routes/user.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "/{*splat}",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
    process.exit(1);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
});

app.listen(config.APP_PORT, async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(
    `Server is running on http://${config.APP_HOST}:${config.APP_PORT}`,
  );
});
