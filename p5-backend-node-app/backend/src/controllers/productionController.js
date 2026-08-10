import { Production } from '../models/Production.js';

// CREATE
export const createProduction = async (req, res) => {
  try {
    const { businessDate, batch, eggCount, } = req.body;
    const existing = await Production.findOne({
      user: req.user._id,
      batch,
      businessDate,
      isDeleted: false,
    });

    if (existing) {
      return res.status(400).json({ message: 'Production record already exists for this batch and date', });
    }
    const production = await Production.create({
      businessDate,
      batch,
      eggCount,
      user: req.user._id
    });
    res.status(201).json(production);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL
export const getProduction = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
      isDeleted: false,
    };

    // Optional query parameter
    if (req.query.batch) {
      filter.batch = req.query.batch;
    }

    const production = await Production.find(filter).sort({ businessDate: -1 });
    res.status(200).json({
      count: production.length,
      production,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// READ ONE
export const getProductionById = async (req, res) => {
  try {
    const production = await Production.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!production) {
      return res.status(404).json({ message: 'Production record not found', });
    }
    res.status(200).json(production);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
export const updateProduction = async (req, res) => {
  try {
    const production = await Production.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!production) {
      return res.status(404).json({ message: 'Production record not found', });
    }

    Object.assign(production, req.body);
    const updated = await production.save();
    res.status(200).json({ message: 'Production record updated successfully', production: updated, });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// SOFT DELETE
export const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!production) {
      return res.status(404).json({ message: 'Production record not found', });
    }

    production.isDeleted = true;
    await production.save();
    res.status(200).json({ message: 'Production deleted successfully', });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};