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
router.get("/getAllUsers", verifyToken, verifyRole(["Admin"]), getAllUsers);
router.post("/createUser", verifyToken, verifyRole(["Admin"]), createUser);
router.get("/getUser/:id", verifyToken, verifyRole(["Admin"]), getUserById);
router.put("/updateUser/:id", verifyToken, verifyRole(["Admin"]), updateUser);
router.delete("/deleteUser/:id", verifyToken, verifyRole(["Admin"]), deleteUser);
router.get("/user/personal", verifyToken, getPersonalInfo);
router.get("/getRoleByUser", verifyToken, getRoleByUserId);

module.exports = router;
