const express = require("express");
const {
    createExam,
    getManyExams,
    getExamById,
    updateExam,
    deleteExam
} = require("../controllers/examController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

// private access
router.get("/exam/all", verifyToken, verifyRole(["Tutor"]), getManyExams);
router.post("/exam/create", verifyToken, verifyRole(["Tutor"]), createExam);
router.get("/exam/id/:exam_id", verifyToken, verifyRole(["Tutor"]), getExamById);
router.put("/exam/update/:exam_id", verifyToken, verifyRole(["Tutor"]), updateExam);
router.delete("/exam/delete/:exam_id", verifyToken, verifyRole(["Tutor"]), deleteExam);

module.exports = router;