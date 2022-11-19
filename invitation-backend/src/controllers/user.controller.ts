import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user';

export const handleRegistration = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Need to see if the user exsists first

  try {
    const { email, password } = req.body;

    // TODO: Better validation require
    if (email === undefined || password === undefined) {
      return res.send(400);
    }

    let createdUser = await userModel.create({
      email: email,
      password: password
    });

    return res.status(201).send(JSON.stringify(createdUser));
  } catch (error) {
    return next(error);
  }
};
