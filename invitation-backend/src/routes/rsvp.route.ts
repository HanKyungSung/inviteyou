import express from 'express';
import { getParticipants, rsvpHandler, rsvpHandlerSecondVersion } from '../controllers/rsvp.controller';

const router = express.Router();

// rsvp
router.get('/list', getParticipants);
router.put('/', rsvpHandler);
// Version 2 that accepts any kind of rsvp form except name and participate
router.put('/v2', rsvpHandlerSecondVersion);

export default router;
