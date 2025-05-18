const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getApiMessage,
  getRoleByUserId,
  getPersonalInfo
} = require("../controllers/userManagement"); 
const { verifyToken } = require("../middlewares/auth"); 

const router = express.Router();

router.get("/", getApiMessage);
router.get("/getAllUsers", verifyToken, getAllUsers);
router.post("/createUser", verifyToken, createUser);
router.get("/getUser/:id", verifyToken, getUserById);
router.put("/updateUser/:id", verifyToken, updateUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.get("/user/personal", verifyToken, getPersonalInfo);
router.get("/getRoleByUser", verifyToken, getRoleByUserId);

module.exports = router;
