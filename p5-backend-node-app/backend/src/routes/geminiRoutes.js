import express from 'express';
import { getGeminiAdvice } from '../controllers/geminiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeMid.js';

const router = express.Router();

router.get('/advice', protect, authorize('owner'), getGeminiAdvice);

export default router;