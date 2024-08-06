import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const SECRET_KEY: Secret = 'any-secret-key'

interface CustomRequest extends Request {
    customReq: string | JwtPayload;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if(!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).customReq = decoded;

        next();
    } catch (error) {
        res.status(401).send({message: 'Unauthorized'})
    }
}