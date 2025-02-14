const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    thumbnail: { type: String, required: true },
    title: { type: String, maxlength: 150, required: true, unique: true },
    description: { type: String, maxlength: 500, required: true },
    usePoint: { type: Boolean, required: true },
    price: { type: Number, required: true, default: 0 },
    point: { type: Number, required: true, default: 0 },
    objectives: [{ type: String, maxlength: 100, required: true }],
    categories: [{ type: mongoose.Types.ObjectId, ref: "Categories", required: true }],
    sections: [{ type: mongoose.Types.ObjectId, ref: "Sections", default: [] }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", required: true },
    rating: { type: Number, default: 0 },
    instructor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    student_enrolled: { type: Number, default: 0 },
    note: { type: String, maxlength: 7000 },
    slug: { type: String, required: true, lowercase: true, unique: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Courses", CourseSchema);