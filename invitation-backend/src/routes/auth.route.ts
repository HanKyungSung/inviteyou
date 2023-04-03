import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { handleLogin } from '../controllers/auth.controller';

const router = express.Router();

// Login
router.post('/', handleLogin);



export default router;