const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    thumbnail: { type: String },
    title: { type: String, maxlength: 200, required: true, unique: true },
    description: { type: String, maxlength: 300, required: true },
    usePoint: { type: Boolean, required: true },
    price: { type: Number, required: true, default: 0 },
    point: { type: Number, required: true, default: 0 },
    objectives: [{ type: String, required: true }],
    categories: [{ type: mongoose.Types.ObjectId, ref: "Categories", default: [] }],
    sections: [{ type: mongoose.Types.ObjectId, ref: "Sections", default: [] }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    instructor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    student_enrolled: { type: Number, default: 0 },
    note: { type: String, maxlength: 6000 }
}, { timestamps: true });

module.exports = mongoose.model("Courses", CourseSchema);