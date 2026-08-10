import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { lastName, firstName, email, password } = req.body;
    const role = req.body.role === 'worker' ? 'worker' : 'owner';

    // Validation
    if (!lastName || !firstName || !email || !password) {
      return res.status(400).json({
        message: 'lastName, firstName, email and password are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      isDeleted: false,
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      lastName,
      firstName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Generate token
    const token = generateToken(user._id);
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required', });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
      isDeleted: false,
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password', });
    }

    // Generate JWT
    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Server error', });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user, });
};

// POST /api/auth/logout
export const logoutUser = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};