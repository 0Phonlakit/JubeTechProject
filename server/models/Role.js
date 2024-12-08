const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    _id: {type: String, required: true,},
    role_name: { type: String, required: true,},
  },
);

const Role = mongoose.model('Role', roleSchema);

// Automatic role addition function
const addDefaultRoles = async () => {
  try {
    const existingRolesCount = await Role.countDocuments();

    if (existingRolesCount > 0) {
      //console.log("Roles already exist. Skipping seed process.");
      return;
    }

    const roles = [
      { _id: '1', role_name: 'Admin' },
      { _id: '2', role_name: 'Student'},
      { _id: '3', role_name: 'Tutor' },
    ];

    await Role.insertMany(roles);
    console.log("Default roles added successfully.");
  } catch (error) {
    console.error("Error adding roles:", error);
  }
};

addDefaultRoles();

module.exports = Role;
