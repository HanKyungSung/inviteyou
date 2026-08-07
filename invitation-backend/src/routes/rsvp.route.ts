import express from 'express';
import { verifyToken, verifyTokenSecondVersion } from '../middlewares/tokenValidation';
import { getParticipants, rsvpHandler, deleteRsvpHandler, rsvpHandlerSecondVersion, rsvpHandlerThirdVersion, postRsvpHandler } from '../controllers/rsvp.controller';

const router = express.Router();

// rsvp
router.get('/list', getParticipants);
router.put('/', rsvpHandler);
router.delete('/', verifyToken, deleteRsvpHandler);
// Version 2 that accepts any kind of rsvp form except name and participate
router.put('/v2', rsvpHandlerSecondVersion);

router.put('/v3', rsvpHandlerThirdVersion);
router.delete('/v3', verifyTokenSecondVersion, deleteRsvpHandler);
router.post('/v3', verifyTokenSecondVersion, postRsvpHandler); 
export default router;
