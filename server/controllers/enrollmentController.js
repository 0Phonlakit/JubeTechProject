const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getMyCourses = async (req, res) => {
  try {
    const { _id } = req.verify_user;

    const enrollments = await Enrollment.find({ 
      user: _id,
      paymentStatus: 'successful'
    })
    .populate({
      path: 'course',
      select: 'title description thumbnail price rating level duration instructor slug',
      populate: {
        path: 'instructor',
        select: 'firstname lastname profileImage'
      }
    })
    .sort({ enrolledAt: -1 });

    const myCourses = enrollments.map(enrollment => {
      return {
        _id: enrollment.course._id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        thumbnail: enrollment.course.thumbnail,
        price: enrollment.course.price,
        rating: enrollment.course.rating,
        level: enrollment.course.level,
        duration: enrollment.course.duration,
        slug: enrollment.course.slug,
        instructor: enrollment.course.instructor,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress,
        status: enrollment.status
      };
    });

    return res.status(200).json({
      success: true,
      count: myCourses.length,
      data: myCourses
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงคอร์สเรียนของฉัน:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงคอร์สเรียนของฉัน',
      error: error.message
    });
  }
};

// ดึงคอร์สเรียนที่ผู้ใช้ลงทะเบียนแล้วตามสถานะ (กำลังเรียน, เรียนจบแล้ว)
exports.getMyCoursesByStatus = async (req, res) => {
  try {
    const userId = req.user.id; // ใช้ ID จาก middleware authentication
    const { status } = req.query; // รับพารามิเตอร์ status จาก query string (active, completed)

    // ตรวจสอบว่า status ถูกต้องหรือไม่
    // if (status && !['active', 'completed'].includes(status)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'สถานะไม่ถูกต้อง ต้องเป็น active หรือ completed เท่านั้น'
    //   });
    // }

    // สร้างเงื่อนไขการค้นหา
    const query = { 
      user: userId,
      paymentStatus: 'successful'
    };

    // เพิ่มเงื่อนไข status ถ้ามีการระบุ
    if (status) {
      query.status = status;
    }

    // ดึงข้อมูลการลงทะเบียนตามเงื่อนไข
    const enrollments = await Enrollment.find(query)
    .populate({
      path: 'course',
      select: 'title description thumbnail price rating level duration instructor slug',
      populate: {
        path: 'instructor',
        select: 'firstname lastname profileImage'
      }
    })
    .sort({ enrolledAt: -1 });

    // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมสำหรับแสดงผล
    const myCourses = enrollments.map(enrollment => {
      return {
        _id: enrollment.course._id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        thumbnail: enrollment.course.thumbnail,
        price: enrollment.course.price,
        rating: enrollment.course.rating,
        level: enrollment.course.level,
        duration: enrollment.course.duration,
        slug: enrollment.course.slug,
        instructor: enrollment.course.instructor,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress,
        status: enrollment.status
      };
    });

    return res.status(200).json({
      success: true,
      count: myCourses.length,
      data: myCourses
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงคอร์สเรียนของฉัน:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงคอร์สเรียนของฉัน',
      error: error.message
    });
  }
};

// อัปเดตความคืบหน้าของคอร์สเรียน
exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, progress } = req.body;

    // ตรวจสอบว่า progress เป็นตัวเลขระหว่าง 0-100
    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: 'ความคืบหน้าต้องอยู่ระหว่าง 0-100'
      });
    }

    // ค้นหาการลงทะเบียน
    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบการลงทะเบียนคอร์สนี้'
      });
    }

    // อัปเดตความคืบหน้า
    enrollment.progress = progress;
    
    // ถ้าความคืบหน้าเป็น 100% ให้อัปเดตสถานะเป็น completed
    if (progress === 100) {
      enrollment.status = 'completed';
    }

    await enrollment.save();

    return res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า',
      error: error.message
    });
  }
};
