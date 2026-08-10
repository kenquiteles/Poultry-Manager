import { Poultry } from '../models/Poultry.js'

// POST /api/poultry
export const createPoultry = async (req, res) => {
  try {
    const {
      businessDate,
      batch,
      breed,
      birthday,
      initialQuantity,
      active,
      feedConsumeRateKg,
      cullingDate,
    } = req.body;

    // Check duplicate batch for this user
    const existingBatch = await Poultry.findOne({
      user: req.user._id,
      batch,
      isDeleted: false,
    });

    if (existingBatch) {
      return res.status(400).json({
        message: 'Batch already exists',
      });
    }

    const poultry = await Poultry.create({
      user: req.user._id,
      businessDate,
      batch,
      breed,
      birthday,
      initialQuantity,
      active,
      feedConsumeRateKg,
      cullingDate,
    });

    res.status(201).json({
      message: 'Poultry batch created successfully',
      poultry,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', });
  }
};

// GET /api/poultry
export const getPoultry = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
      isDeleted: false,
    };

    // Optional query parameter: ?breed=...
    if (req.query.breed) {
      filter.breed = req.query.breed;
    }

    const poultry = await Poultry.find(filter).sort({ businessDate: -1 });
    res.status(200).json({ count: poultry.length, poultry, });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', });
  }
};

// GET /api/poultry/:id
export const getPoultryById = async (req, res) => {
  try {
    const poultry = await Poultry.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!poultry) {
      return res.status(404).json({ message: 'Poultry not found', });
    }
    res.status(200).json(poultry);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', });
  }
};

// PUT /api/poultry/:id
export const updatePoultry = async (req, res) => {
  try {
    const poultry = await Poultry.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!poultry) {
      return res.status(404).json({ message: 'Poultry not found', });
    }

    const {
      businessDate,
      batch,
      breed,
      birthday,
      initialQuantity,
      active,
      feedConsumeRateKg,
      cullingDate,
    } = req.body;

    // Prevent duplicate batch names for the same user
    if (batch && batch !== poultry.batch) {
      const existingBatch = await Poultry.findOne({
        user: req.user._id,
        batch,
        isDeleted: false,
        _id: { $ne: poultry._id },
      });

      if (existingBatch) {
        return res.status(400).json({ message: 'Batch already exists', });
      }
    }

    poultry.businessDate = businessDate ?? poultry.businessDate;
    poultry.batch = batch ?? poultry.batch;
    poultry.breed = breed ?? poultry.breed;
    poultry.birthday = birthday ?? poultry.birthday;
    poultry.initialQuantity = initialQuantity ?? poultry.initialQuantity;
    poultry.active = active ?? poultry.active;
    poultry.feedConsumeRateKg = feedConsumeRateKg ?? poultry.feedConsumeRateKg;
    poultry.cullingDate = cullingDate ?? poultry.cullingDate;
    const updatedPoultry = await poultry.save();
    res.status(200).json({ message: 'Poultry updated successfully', poultry: updatedPoultry, });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', });
  }
};

// DELETE /api/poultry/:id
export const deletePoultry = async (req, res) => {
  try {
    const poultry = await Poultry.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!poultry) {
      return res.status(404).json({ message: 'Poultry not found', });
    }

    // Soft delete
    poultry.isDeleted = true;
    await poultry.save(); res.status(200).json({ message: 'Poultry deleted successfully', });

  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Server error', });
  }
};