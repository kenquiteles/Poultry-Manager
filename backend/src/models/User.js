import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({

  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, lowercase: true,
    trim: true,
  },

  password: {
    type: String, required: [true, 'Password is required'],
    minlength: 6,
  },

  role: {
    type: String,
    enum: ['owner', 'worker'],
    default: 'owner',
  },

  // Soft deletion
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
  });

export const User = mongoose.model('User', userSchema);