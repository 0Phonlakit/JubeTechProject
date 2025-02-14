const express = require("express");
const { createSection } = require("../controllers/sectionController");
const router = express.Router();

router.post("/section/create", createSection);

module.exports = router;