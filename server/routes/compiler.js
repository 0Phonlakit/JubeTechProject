const express = require("express");
const { getCodingLanguages } = require("../controllers/compilerController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express();

// private access
router.get("/coding/languages/all", verifyToken, verifyRole(["Tutor"]), getCodingLanguages);

module.exports = router;