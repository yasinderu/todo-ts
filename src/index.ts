import { pool } from "./db/pool";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const port = 3000;

pool
  .connect()
  .then(() => {
    app().listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
