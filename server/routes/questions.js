const express = require("express");
const {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    updateOneQuestion
} = require("../controllers/questionController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

// private access
router.post("/question/create", verifyToken, verifyRole(["Tutor"]), createQuestion);
router.put("/question/update/", verifyToken, verifyRole(["Tutor"]), updateQuestion);
router.put("/question/update/:question_id", verifyToken, verifyRole(["Tutor"]), updateOneQuestion);
router.delete("/question/delete/:question_id", verifyToken, verifyRole(["Tutor"]), deleteQuestion);

module.exports = router;