import express from "express";
import { UserRepo } from "../repos/user-repo";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await UserRepo.findAll();

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export { router };
