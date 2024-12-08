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
    const users = await User.find().populate("role", "role_name");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error fetching users", error: err.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role", "role_name");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error fetching user", error: err.message });
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role_name } = req.body;

    const validRole = await Role.findOne({ role_name });
    if (!validRole) {
      return res.status(400).json({ message: `Role "${role_name}" not found` });
    }

    // คำนวณ ID ใหม่ที่สูงสุดจากฐานข้อมูล
    const lastUser = await User.findOne().sort({ _id: -1 });
    const newId = lastUser ? lastUser._id + 1 : 1; // ถ้าไม่มีผู้ใช้ในฐานข้อมูลเริ่มต้นที่ 1

    const newUser = new User({
      _id: newId,
      firstname,
      lastname,
      email,
      password,
      role: [validRole._id],
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    await newUser.save();
    const createdUser = await User.findById(newUser._id).populate('role', 'role_name');

    res.status(201).json(createdUser);
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
    const { firstname, lastname, email, password, role_name, currentPassword } = req.body; // รับ currentPassword จาก frontend

    // หา user ด้วย userId
    const user = await User.findById(req.params.id);

    // ตรวจสอบรหัสผ่านปัจจุบันด้วย bcrypt
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // ค้นหาบทบาทที่เกี่ยวข้อง
    const validRole = await Role.findOne({ role_name });
    if (!validRole) {
      return res.status(400).json({ message: "Role not found" });
    }

    // หากมีการเปลี่ยนแปลงรหัสผ่าน, ให้แฮชใหม่
    let hashedPassword = user.password; // รักษารหัสผ่านเดิม
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // แฮชรหัสผ่านใหม่
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        lastname,
        email,
        password: hashedPassword, // ใช้รหัสผ่านที่แฮชแล้ว
        role: validRole._id,
      },
      { new: true }
    ).populate('role', 'role_name');

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
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
