const express = require("express");
const {
    createCourse,
    getCoursesByTutor,
    getAllCourses,
    paginationCourse,
    getCourseBySlug,
    getCourseById,
    updateCourse,
    deleteCourse,
    getSubCourseData,
    getLearnCourse,
    getInfoCourse,
    attachCourseTest
} = require("../controllers/courseController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

// public access
router.get("/course/all", getAllCourses);
router.get("/course/pagination", paginationCourse);
router.get("/course/slug/:slug", getCourseBySlug);
// private access
router.get("/course/info/:course_id", getInfoCourse);
router.get("/course/learn/:course_id", getLearnCourse);
router.post("/course/create", verifyToken, verifyRole(["Tutor"]), createCourse);
router.get("/course/tutor", verifyToken, verifyRole(["Tutor"]), getCoursesByTutor);
router.get("/course/id/:course_id", verifyToken, verifyRole(["Tutor"]), getCourseById);
router.put("/course/update/:course_id", verifyToken, verifyRole(["Tutor"]), updateCourse);
router.delete("/course/delete/:course_id", verifyToken, verifyRole(["Tutor"]), deleteCourse);
router.get("/course/sub/id/:course_id", verifyToken, verifyRole(["Tutor"]), getSubCourseData);
router.post("/course/attach/exam/:course_id", verifyToken, verifyRole(["Tutor"]), attachCourseTest);

module.exports = router;