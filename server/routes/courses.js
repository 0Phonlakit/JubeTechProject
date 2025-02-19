const express = require("express");
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require("../controllers/courseController");

const router = express.Router();

router.get("/course/pagination", getCourses);
router.get("/course/:course_id", getCourseById);
router.post("/course/create", createCourse);
router.put("/course/update", updateCourse);
router.delete("/course/delete", deleteCourse);

module.exports = router;