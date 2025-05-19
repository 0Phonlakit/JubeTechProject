const Omise = require('omise');
const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// ตั้งค่า Omise ด้วย API keys จาก .env
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});


exports.createCharge = async (req, res) => {
  try {
    const { token, amount, courseIds } = req.body;

    const { _id } = req.verify_user;

    console.log("id", _id);
    console.log("courseIds", courseIds);
    
    if (!token || !amount || !_id || !courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (token, amount, courseIds, userId)',
      });
    }

    // ตรวจสอบคอร์สทั้งหมดที่ต้องการซื้อ
    const courses = await Course.find({ _id: { $in: courseIds } });
    courses.map(async(course) => {
      course.student_enrolled = course.student_enrolled + 1;
      await course.save();
    });
    
    if (courses.length !== courseIds.length) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบคอร์สบางรายการที่ต้องการซื้อ',
      });
    }
    
    // ใช้คอร์สแรกเป็นตัวอย่าง (สำหรับโค้ดเดิมที่ใช้ course เดียว)
    const course = courses[0];

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบคอร์สที่ต้องการซื้อ',
      });
    }


    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลผู้ใช้',
      });
    }


    const existingEnrollment = await Enrollment.findOne({
      user: _id,
      course: course._id,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'คุณได้ลงทะเบียนคอร์สนี้ไปแล้ว',
      });
    }


    const charge = await omise.charges.create({
      amount: amount * 100, 
      currency: 'thb',
      card: token,
      metadata: {
        courseId:course._id,
        userId:_id,
      },
      description: `ชำระเงินสำหรับคอร์ส: ${course.title}`,
      capture: true, 
    });


    if (charge.status === 'successful' || charge.status === 'pending') {
      const enrollment = new Enrollment({
        user: _id,
        course: course._id,
        paymentId: charge.id,
        paymentStatus: charge.status,
        paymentAmount: amount,
        enrolledAt: new Date(),
        progress: 0, 
      });

      await enrollment.save();

      return res.status(200).json({
        success: true,
        message: 'ชำระเงินสำเร็จ',
        data: {
          chargeId: charge.id,
          status: charge.status,
          amount: amount,
          course: course.title,
          enrollmentId: enrollment._id,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'การชำระเงินไม่สำเร็จ',
        data: {
          chargeId: charge.id,
          status: charge.status,
        },
      });
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการชำระเงิน:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการชำระเงิน',
      error: error.message,
    });
  }
};


exports.getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุ userId',
      });
    }

    // ดึงข้อมูลการลงทะเบียนทั้งหมดของผู้ใช้
    const enrollments = await Enrollment.find({ user: userId })
      .populate('course', 'title thumbnail price')
      .sort({ enrolledAt: -1 });

    return res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงประวัติการชำระเงิน:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงประวัติการชำระเงิน',
      error: error.message,
    });
  }
};
exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, courseId, userId, returnUrl, paymentMethod } = req.body;

    if (!amount || !courseId || !userId || !returnUrl || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (amount, courseId, userId, returnUrl, paymentMethod)',
      });
    }

    // ตรวจสอบว่าคอร์สมีอยู่จริง
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบคอร์สที่ต้องการซื้อ',
      });
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่จริง
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลผู้ใช้',
      });
    }

    // ตรวจสอบว่าผู้ใช้ซื้อคอร์สนี้ไปแล้วหรือไม่
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'คุณได้ลงทะเบียนคอร์สนี้ไปแล้ว',
      });
    }

    let source;
    
    // สร้าง source ตามวิธีการชำระเงิน
    if (paymentMethod === 'promptpay') {
      source = await omise.sources.create({
        type: 'promptpay',
        amount: amount * 100,
        currency: 'thb',
      });
    } else if (paymentMethod === 'internet_banking') {
      const { bank } = req.body;
      if (!bank) {
        return res.status(400).json({
          success: false,
          message: 'กรุณาระบุธนาคาร',
        });
      }
      
      source = await omise.sources.create({
        type: 'internet_banking_' + bank,
        amount: amount * 100,
        currency: 'thb',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'วิธีการชำระเงินไม่ถูกต้อง',
      });
    }

    // สร้าง charge
    const charge = await omise.charges.create({
      amount: amount * 100,
      currency: 'thb',
      source: source.id,
      return_uri: returnUrl,
      metadata: {
        courseId,
        userId,
      },
      description: `ชำระเงินสำหรับคอร์ส: ${course.title}`,
    });

    // บันทึกข้อมูลการลงทะเบียนเบื้องต้น (สถานะ pending)
    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      paymentId: charge.id,
      paymentStatus: 'pending',
      paymentAmount: amount,
      enrolledAt: new Date(),
      progress: 0,
    });

    await enrollment.save();

    return res.status(200).json({
      success: true,
      message: 'สร้าง checkout session สำเร็จ',
      data: {
        authorizeUri: charge.authorize_uri,
        chargeId: charge.id,
        status: charge.status,
        amount: amount,
        course: course.title,
        enrollmentId: enrollment._id,
      },
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้าง checkout session:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้าง checkout session',
      error: error.message,
    });
  }
};

/**
 * ตรวจสอบสถานะการชำระเงิน
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { chargeId } = req.params;

    if (!chargeId) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุ chargeId',
      });
    }

    // ดึงข้อมูล charge จาก Omise
    const charge = await omise.charges.retrieve(chargeId);

    // อัปเดตสถานะการชำระเงินในฐานข้อมูล
    const enrollment = await Enrollment.findOne({ paymentId: chargeId });
    
    if (enrollment) {
      enrollment.paymentStatus = charge.status;
      
      if (charge.status === 'successful') {
        // อัปเดตสถานะการลงทะเบียนเป็นสำเร็จ
        enrollment.status = 'active';
      } else if (charge.status === 'failed') {
        // อัปเดตสถานะการลงทะเบียนเป็นล้มเหลว
        enrollment.status = 'failed';
      }
      
      await enrollment.save();
    }

    return res.status(200).json({
      success: true,
      data: {
        chargeId: charge.id,
        status: charge.status,
        amount: charge.amount / 100, // แปลงกลับเป็นบาท
        paymentMethod: charge.source ? charge.source.type : charge.card ? 'credit_card' : 'unknown',
        updatedAt: charge.updated_at,
      },
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการตรวจสอบสถานะการชำระเงิน:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะการชำระเงิน',
      error: error.message,
    });
  }
};

/**
 * Webhook สำหรับรับการแจ้งเตือนจาก Omise
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.webhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.data && event.data.object === 'charge') {
      const charge = event.data;
      
      const enrollment = await Enrollment.findOne({ paymentId: charge.id });
      
      if (enrollment) {
        enrollment.paymentStatus = charge.status;
        
        if (charge.status === 'successful') {
          // อัปเดตสถานะการลงทะเบียนเป็นสำเร็จ
          enrollment.status = 'active';
        } else if (charge.status === 'failed') {
          // อัปเดตสถานะการลงทะเบียนเป็นล้มเหลว
          enrollment.status = 'failed';
        }
        
        await enrollment.save();
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดใน webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดใน webhook',
      error: error.message,
    });
  }
};
