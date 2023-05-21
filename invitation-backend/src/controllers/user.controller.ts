import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';

export const handleRegistration = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Need to see if the user exsists first

  try {
    const { email, firstName, lastName, password, confirmedPassword } = req.body;

    // TODO: Better validation require
    if (email === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      password === undefined ||
      confirmedPassword === undefined
    ) {
      return res.send(400);
    }

    // Check if the user already exists with the input email.
    const existUser = await UserModel.findOne({ email: email }).exec();

    if (existUser !== null) {
      return res.status(409).send('Email already used');
    }

    // If user doesn't exists, we create a new user.
    const createdUser = new UserModel({
      email: email,
      firstName: firstName,
      lastName: lastName
    });
    createdUser.setPassword(password);
    await createdUser.save();
    await new Promise(r => setTimeout(r, 5000));
    // Debug
    console.log(createdUser);

    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};
