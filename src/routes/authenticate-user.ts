import express from "express";
import { UserRepo } from "../repos/user-repo";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "any-secret-key";

router.post("/auth/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepo.findByUsername(req.body.username);

    if (user) {
      return res.sendStatus(500);
    }
    const pass = bcrypt.hashSync(password);
    const newUser = await UserRepo.create(username, pass);

    if (newUser) return res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepo.findByUsername(username);

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorect password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      }
    );

    res.status(200).send({
      id: user.id,
      username: user.name,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export { router };
