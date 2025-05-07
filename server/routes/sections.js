const express = require("express");
const {
    createOneSection
} = require("../controllers/sectionController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

router.post("/section/create", verifyToken, verifyRole(["Tutor"]), createOneSection);

module.exports = router;