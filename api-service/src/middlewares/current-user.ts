import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    uuid: string;
    email: string;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY! || "mysecret") as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.log('Error: ', err);
    }

    next();
};