import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendContactInquiry } from '../controllers/contact.controller';

const router = express.Router();

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many inquiries were submitted. Please try again later.'
  }
});

router.post('/', contactRateLimit, sendContactInquiry);

export default router;
