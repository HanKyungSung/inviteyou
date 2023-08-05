import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';
import * as jwt from 'jsonwebtoken'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { SECRET_KEY } = process.env;

    if (email === undefined || password === undefined) {

      return res.sendStatus(401);  
    }

    // Check if the user exists
    const existUser = await UserModel.findOne({ email: email }).exec();

    if (existUser === null) {
      return res.status(409).send("Invalid email or password");
    }

    // Compare the password
    if (!existUser.validatePassword(password)) {
      return res.status(403).send("Invalid email or password")
    }

    const token = jwt.sign({ user: existUser }, SECRET_KEY);

    return res.status(200).json({
      'email': existUser.email,
      'firstName': existUser.firstName,
      'lastName': existUser.lastName,
      'subdomains': existUser.subdomains,
      'token': token
    });
  } catch (error) {
    return next(error)
  }
};