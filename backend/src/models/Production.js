import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema(
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

    eggCount: {
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

export const Production = mongoose.model('Production', productionSchema);