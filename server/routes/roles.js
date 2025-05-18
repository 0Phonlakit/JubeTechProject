const express = require("express");
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles"); 
const { verifyToken } = require("../middlewares/auth"); 

const router = express.Router();

router.get("/getAllRoles", verifyToken, getAllRoles);
router.get("/getRole/:id", verifyToken, getRoleById);
router.post("/createRole", verifyToken, createRole);
router.put("/updateRole/:id", verifyToken, updateRole);  
router.delete("/deleteRole/:id", verifyToken, deleteRole);

module.exports = router;