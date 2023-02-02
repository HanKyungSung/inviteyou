import express from 'express';
import { rsvpHandler } from '../controllers/rsvp.controller';

const router = express.Router();

// rsvp
router.post('/', rsvpHandler);

export default router;