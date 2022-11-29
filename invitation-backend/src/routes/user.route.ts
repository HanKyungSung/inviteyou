import express from 'express';
import { handleRegistration } from '../controllers/user.controller';

const router = express.Router();

// Registration
router.post('/', handleRegistration);

export default router;