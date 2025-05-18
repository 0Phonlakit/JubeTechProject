const express = require("express");
const { getCodingLanguages, compileTestCode } = require("../controllers/compilerController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express();

// private access
router.get("/coding/languages/all", verifyToken, getCodingLanguages);
router.post("/coding/submissions", verifyToken, compileTestCode);

module.exports = router;