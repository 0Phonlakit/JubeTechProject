const User = require('../models/User');
const Course = require('../models/Course');
const Promotion = require('../models/Promotion');

const getDashboardOverview = async (req, res) => {
  try {
    // นับจำนวนผู้ใช้ทั้งหมด
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: true });
    const inactiveUsers = await User.countDocuments({ status: false });

    // สรุปผู้ใช้ใหม่ในแต่ละเดือน แยกตาม role
    const now = new Date();
    const year = now.getFullYear();

    const monthlyNewUsers = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "role_ids",
          foreignField: "_id",
          as: "roles_info"
        }
      },
      {
        $unwind: "$roles_info"
      },
      {
        $addFields: {
          lower_role: { $toLower: "$roles_info.role_name" }
        }
      },
      {
        $match: {
          lower_role: { $in: ["student", "tutor"] }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            role: "$lower_role"
          },
          count: { $sum: 1 }
        }
      }
    ]);
    

    // จัดรูปแบบข้อมูลใหม่ให้เรียงตามเดือน
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      tutor: 0,
      student: 0
    }));
    
    monthlyNewUsers.forEach(({ _id, count }) => {
      const { month, role } = _id;
      if (role === "tutor") {
        monthlyData[month - 1].tutor = count;
      } else if (role === "student") {
        monthlyData[month - 1].student = count;
      }
    });    

    // debug
    // console.log("monthlyNewUsers", monthlyNewUsers);

    // คอร์สเรียน
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ status: "published" });
    const draftCourses = await Course.countDocuments({ status: "draft" });
    const topCourses = await Course.find().sort({ student_enrolled: -1 }).limit(5);

    // โปรโมชั่น
    const activePromotions = await Promotion.countDocuments({ status: true });
    const expiringPromotions = await Promotion.countDocuments({
      end_date: { $lt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
    });

    // รายได้รวม (รอเชื่อมกับ Transaction ในอนาคต)
    const totalRevenue = 0;

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
        monthlyNewUsers: monthlyData
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
        draft: draftCourses,
        topCourses
      },
      promotions: {
        active: activePromotions,
        expiring: expiringPromotions
      },
      revenue: {
        total: totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardOverview };
