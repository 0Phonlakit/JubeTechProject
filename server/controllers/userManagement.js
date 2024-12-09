const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

// 
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
    const modifyTypeRole = role_ids.map(id => new mongoose.Types.ObjectId(id));
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role_ids: modifyTypeRole,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'There was an error creating the user',
      error: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role_ids, currentPassword } = req.body; // รับ currentPassword จาก frontend
    const modifyTypeRole = role_ids.map(id => new mongoose.Types.ObjectId(id));

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    let hashedPassword = user.password;
    if (password) {
      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.role_ids = modifyTypeRole;
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err.message });
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getApiMessage
};
