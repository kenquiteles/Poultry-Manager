import express from 'express';
import { createProduction, getProduction, getProductionById, updateProduction, deleteProduction, } from '../controllers/productionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeMid.js';

const router = express.Router();

router.post('/', protect, authorize('owner', 'worker'), createProduction);
router.get('/', protect, authorize('owner', 'worker'), getProduction);
router.get('/:id', protect, authorize('owner', 'worker'), getProductionById);
router.put('/:id', protect, authorize('owner', 'worker'), updateProduction);
router.delete('/:id', protect, authorize('owner'), deleteProduction);

export default router;