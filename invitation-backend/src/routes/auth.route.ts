import express from 'express';
import { handleLogin } from '../controllers/auth.controller';

const router = express.Router();

// Login
router.post('/', handleLogin);

export default router;
