import express, { Request, Response } from "express";
import { pool } from "./db/pool";
import dotenv from "dotenv";
dotenv.config();

import { router as todoRouter } from "./routes/todos";
import { router as authRouter } from "./routes/authenticate-user";
import { router as userRouter } from "./routes/users";
import { authenticate } from "./routes/auth";

const app = express();
const port = 3000;
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(authenticate, todoRouter);

pool
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
