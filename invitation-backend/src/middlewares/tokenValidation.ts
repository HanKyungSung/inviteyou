/**
 * Reference: https://www.simplilearn.com/tutorials/nodejs-tutorial/jwt-authentication
 */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IRequest extends Request {
  token: string;
}

export const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];
  
  if (typeof bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(" ")[1];
    const { SECRET_KEY } = process.env;

    jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.token = bearerToken;

        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
