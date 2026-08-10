import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
      trim: true,
    },

    transaction: {
      type: String,
      enum: ['Income', 'Expense'],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    magnitude: {
      type: Number,
      trim: true,
      default: '',
    },

    unit: {
      type: String,
      trim: true,
      default: '',
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid'],
      default: 'Unpaid',
    },
  },
  
  {
    timestamps: true
  }
);

export const Finance = mongoose.model('Finance', financeSchema);