const mongoose = require('mongoose');
const { Schema } = mongoose;

// สร้าง schema สำหรับ Role
const roleSchema = new Schema(
  {
    _id: {
      type: String,
      required: true, // ให้ _id เป็น string ที่จำเป็น
    },
    role_name: {
      type: String,
      required: true,
    },
  },
);

const Role = mongoose.model('Role', roleSchema);

// ฟังก์ชันเพิ่ม Role อัตโนมัติ
const addDefaultRoles = async () => {
  try {
    const existingRolesCount = await Role.countDocuments(); // นับจำนวน role ในฐานข้อมูล

    if (existingRolesCount > 0) {
      //console.log("Roles already exist. Skipping seed process.");
      return; // ถ้ามี role แล้ว ให้หยุดทำงาน
    }

    const roles = [
      { _id: '1', role_name: 'Admin' },
      { _id: '2', role_name: 'Student'},
      { _id: '3', role_name: 'Tutor' },
    ];

    await Role.insertMany(roles); // เพิ่ม role ทีเดียวหลายตัว
    console.log("Default roles added successfully.");
  } catch (error) {
    console.error("Error adding roles:", error);
  }
};


// เรียกใช้ฟังก์ชันเพิ่ม Role อัตโนมัติเมื่อไฟล์นี้ถูกโหลด
addDefaultRoles();

module.exports = Role;
