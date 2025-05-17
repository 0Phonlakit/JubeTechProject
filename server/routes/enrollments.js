const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const enrollmentController = require('../controllers/enrollmentController');

// Routes สำหรับคอร์สเรียนของฉัน
router.get('/enrollments/my-courses', verifyToken, enrollmentController.getMyCourses);
router.get('/enrollments/my-courses/status', verifyToken, enrollmentController.getMyCoursesByStatus);
router.put('/enrollments/progress', verifyToken, enrollmentController.updateCourseProgress);

module.exports = router;
