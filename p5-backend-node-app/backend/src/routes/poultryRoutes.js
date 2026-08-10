import express from 'express';
import { createPoultry, getPoultry, getPoultryById, updatePoultry, deletePoultry } from '../controllers/poultryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeMid.js';

const router = express.Router();

router.post('/', protect, authorize('owner'), createPoultry);
router.get('/', protect, authorize('owner', 'worker'), getPoultry);
router.get('/:id', protect, authorize('owner', 'worker'), getPoultryById);
router.put('/:id', protect, authorize('owner'), updatePoultry);
router.delete('/:id', protect, authorize('owner'), deletePoultry);

export default router;