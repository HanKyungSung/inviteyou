import { NextFunction, Request, Response } from 'express';
import rsvpModel from '../models/rsvp';

export const rsvpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, participate, menu, note } = req.body;

    if (name === undefined || participate === undefined || menu === undefined || note === undefined) {
      return res.send(400);
    }

    // let createdRsvp = await rsvpModel.create({
    //   name,
    //   participate,
    //   menu,
    //   note
    // });

    return res.status(201).send(JSON.stringify(req.body));
  } catch (error) {
    return next(error);
  }
};
