const express = require("express");
const {
    createLesson,
    getLessonByTutor,
    getLessonById,
    updateLesson,
    deleteLesson,
    searchLessonForTest
} = require("../controllers/lessonController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

// only tutor
router.post("/lesson/create", verifyToken, verifyRole(["Tutor"]), createLesson);
router.get("/lesson/filter", verifyToken, verifyRole(["Tutor"]), getLessonByTutor);
router.get("/lesson/search", verifyToken, verifyRole(["Tutor"]), searchLessonForTest);
router.get("/lesson/id/:lesson_id", verifyToken, getLessonById);
router.put("/lesson/update/:lesson_id", verifyToken, verifyRole(["Tutor"]), updateLesson);
router.delete("/lesson/delete/:lesson_id", verifyToken, verifyRole(["Tutor"]), deleteLesson);

module.exports = router;