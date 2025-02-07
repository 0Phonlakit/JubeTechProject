// mockup Course model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number }, // Duration in hours
    status: { type: Boolean, default: true } // Active or not
    }, 
    { 
        timestamps: true 
    }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
