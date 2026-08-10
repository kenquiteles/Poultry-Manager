import mongoose from 'mongoose';

const poultrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    businessDate: {
      type: Date,
      default: Date.now,
    },
    
    batch: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    birthday: {
      type: Date,
      required: true,
    },

    initialQuantity: {
      type: Number,
      required: true,
      min: 1,
    },

    active: {
      type: Number,
      required: true,
      min: 0,
    },

    feedConsumeRateKg: {
      type: Number,
      required: true,
      min: 0,
    },

    cullingDate: {
      type: Date,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export const Poultry = mongoose.model('Poultry', poultrySchema);