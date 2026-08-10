import { Inventory } from '../models/Inventory.js';

// CREATE
export const createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      message: 'Inventory item created successfully',
      inventory
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL
export const getInventory = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
      isDeleted: false,
    };

    // Optional query parameter
    if (req.query.itemType) {
      filter.itemType = req.query.itemType;
    }

    const inventory = await Inventory.find(filter).sort({ businessDate: -1 });
    res.status(200).json({
      count: inventory.length,
      inventory,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ONE
export const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found', });
    }

    res.status(200).json(inventory);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
export const updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found', });
    }

    Object.assign(inventory, req.body);
    const updated = await inventory.save();
    res.status(200).json({ message: 'Inventory updated successfully', inventory: updated, });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// SOFT DELETE
export const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found', });
    }

    inventory.isDeleted = true;
    await inventory.save();
    res.status(200).json({ message: 'Inventory deleted successfully', });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};