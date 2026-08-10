import express from 'express';
import { createInventory, getInventory, getInventoryById, updateInventory, deleteInventory, } from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeMid.js';

const router = express.Router();

router.post('/', protect, authorize('owner', 'worker'), createInventory);
router.get('/', protect, authorize('owner', 'worker'), getInventory);
router.get('/:id', protect, authorize('owner', 'worker'), getInventoryById);
router.put('/:id', protect, authorize('owner', 'worker'), updateInventory);
router.delete('/:id', protect, authorize('owner'), deleteInventory);

export default router;