import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
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

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    itemType: {
      type: String,
      required: true,
      trim: true,
    },

    lowStockThreshold: {
      type: Number,
      required: true,
      min: 0,
    },

    magnitude: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true
  }
);

export const Inventory = mongoose.model('Inventory', inventorySchema);