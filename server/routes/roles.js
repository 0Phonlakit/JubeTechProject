const express = require("express");
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles"); 
const { verifyToken, verifyRole } = require("../middlewares/auth"); 

const router = express.Router();

router.get("/getAllRoles", verifyToken, verifyRole(["Admin"]), getAllRoles);
router.get("/getRole/:id", verifyToken, verifyRole(["Admin"]), getRoleById);
router.post("/createRole", verifyToken, verifyRole(["Admin"]), createRole);
router.put("/updateRole/:id", verifyToken, verifyRole(["Admin"]), updateRole);  
router.delete("/deleteRole/:id", verifyToken, verifyRole(["Admin"]), deleteRole);

module.exports = router;