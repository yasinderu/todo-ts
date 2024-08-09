import express from "express";
import { router as todoRouter } from "./routes/todos";
import { router as authRouter } from "./routes/authenticate-user";
import { router as userRouter } from "./routes/users";
import { authenticate } from "./routes/auth";

export default function () {
  const app = express();
  app.use(express.json());

  app.use(authRouter);
  app.use(userRouter);
  app.use(authenticate, todoRouter);

  return app;
}
