import express from 'express';
import { createFinance, getFinance, getFinanceById, updateFinance, deleteFinance, } from '../controllers/financeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeMid.js';

const router = express.Router();

router.post('/', protect, authorize('owner'), createFinance);
router.get('/', protect, authorize('owner'), getFinance);
router.get('/:id', protect, authorize('owner'), getFinanceById);
router.put('/:id', protect, authorize('owner'), updateFinance);
router.delete('/:id', protect, authorize('owner'), deleteFinance);

export default router;