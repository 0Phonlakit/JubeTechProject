const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

// Test Backend API
const getApiMessage = (req, res) => {
  res.send("This is the backend of the jubeTech app");
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role_ids");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error fetching users", error: err.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role_ids");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error fetching user", error: err.message });
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role_ids } = req.body;

    // Validate inputs
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validateLength(password, 8, 20)) {
      return res.status(400).json({ message: "Password must be between 8 and 20 characters" });
    }
    if (!Array.isArray(role_ids) || role_ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid role_ids format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role_ids: role_ids.map(id => new mongoose.Types.ObjectId(id)),
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role_ids, currentPassword } = req.body;

    // Validate inputs
    if (email && !validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password && !validateLength(password, 8, 20)) {
      return res.status(400).json({ message: "Password must be between 8 and 20 characters" });
    }
    if (!Array.isArray(role_ids) || role_ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid role_ids format" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle password update
    if (password) {
      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    // Update other fields
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.role_ids = role_ids.map(id => new mongoose.Types.ObjectId(id)) || user.role_ids;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err.message });
  }
};

// getAllRoles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching roles", error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllRoles,
  getApiMessage
};
