import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.JWT_SECRET || "any-secret-key";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = { ...req.params };
    const userId = req.user.id;

    if (params.userId != userId) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({ message: "User is not authorized" });
  }
};
