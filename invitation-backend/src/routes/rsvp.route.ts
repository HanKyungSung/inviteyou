import express from 'express';
import { getParticipants, rsvpHandler } from '../controllers/rsvp.controller';

const router = express.Router();

// rsvp
router.get('/list', getParticipants);
router.put('/', rsvpHandler);

export default router;
