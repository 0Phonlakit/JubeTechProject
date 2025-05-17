const express = require("express");
const { getCodingLanguages, compileTestCode } = require("../controllers/compilerController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express();

// private access
router.get("/coding/languages/all", verifyToken, verifyRole(["Tutor", "Student"]), getCodingLanguages);
router.post("/coding/submissions", verifyToken, verifyRole(["Tutor"]), compileTestCode);

module.exports = router;