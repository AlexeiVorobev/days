const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register User" });
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
          });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    
  res.json({ message: "Login user" });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, email} = await User.findById(req.user.id)

  res.status(200).json(req.user)
});

// @desc Get user's tags
// @route GET /api/users/tags
// @access Private
const getUserTags = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('tags');

  if (user) {
    res.status(200).json(user.tags);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user's tags
// @route PUT /api/users/tags
// @access Private
const updateUserTags = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.tags = req.body;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.tags);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const generateToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserTags,
  getUserTags
};
