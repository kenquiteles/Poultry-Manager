import { Finance } from '../models/Finance.js';

// CREATE
export const createFinance = async (req, res) => {
  try {
    const finance = await Finance.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      message: 'Finance record created successfully',
      finance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL
export const getFinance = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
      isDeleted: false,
    };

    // Optional query parameter
    if (req.query.transaction) {
      filter.transaction = req.query.transaction;
    }

    const finance = await Finance.find(filter).sort({ businessDate: -1 });
    res.status(200).json({
      count: finance.length,
      finance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ONE
export const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found', });
    }
    res.status(200).json(finance);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
export const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found', });
    }

    Object.assign(finance, req.body);
    const updated = await finance.save();
    res.status(200).json({ message: 'Finance updated successfully', finance: updated, });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// SOFT DELETE
export const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!finance) {
      return res.status(404).json({ message: 'Finance record not found', });
    }

    finance.isDeleted = true; await finance.save();
    res.status(200).json({ message: 'Finance deleted successfully', });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};