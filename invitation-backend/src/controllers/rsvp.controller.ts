import { NextFunction, Request, Response } from 'express';
import rsvpModel from '../models/rsvp';

export const getParticipants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subdomain } = req.query;

    // Remove fields: https://stackoverflow.com/questions/33799375/how-to-remove-mongo-specific-fields-from-result-nodejs-mongoose
    const participants = await rsvpModel.find({ subdomain: subdomain }).select(["-_id", "-subdomain"]);

    console.log(participants);
    return res.status(200).send(JSON.stringify(participants));
  } catch (error) {
    return next(error);
  }
};

export const rsvpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const { name, participate, menu, note, subdomain } = body;

    if (name === undefined || participate === undefined || menu === undefined || note === undefined) {
      return res.send(400);
    }

    // Look for the exists record
    const record = await rsvpModel.findOne({ name: name });

    // Create a new record if no exist record found.
    if (record === null) {
      const createdRsvp = await rsvpModel.create({
        name,
        participate,
        menu,
        note,
        subdomain
      });

      // Convert document to Object and remove object id from the result
      const createdRsvpObject = createdRsvp.toObject();
      delete createdRsvpObject._id;

      return res.status(201).send(JSON.stringify(createdRsvpObject));
    } else {
      // Update the exists record.
      const updatedRecord = await rsvpModel.updateOne({
        name: name
      }, {
        ...body
      });

      return res.status(200).send(JSON.stringify(updatedRecord));
    }
  } catch (error) {
    return next(error);
  }
};
