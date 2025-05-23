const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    thumbnail: { type: String },
    title: { type: String, maxlength: 150, required: true, unique: true },
    description: { type: String, maxlength: 500, required: true },
    usePoint: { type: Boolean, required: true },
    price: { type: Number, required: true, default: 0 },
    point: { type: Number, required: true, default: 0 },
    objectives: [{ type: String, maxlength: 100, required: true }],
    group_ids: [{ type: mongoose.Types.ObjectId, ref: "Groups", required: true }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", required: true },
    rating: { type: Number, default: 0 }, // by student
    instructor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    student_enrolled: { type: Number, default: 0 }, // by student
    note: { type: String, maxlength: 7000 },
    pretest: { type: mongoose.Schema.ObjectId, ref: "Exams", default: null },
    posttest: { type: mongoose.Schema.ObjectId, ref: "Exams", default: null },
    useCertificate: { type: Boolean, required: true },
    duration: { type: Number, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "expert"], required: true },
    slug: { type: String, required: true, lowercase: true, unique: true },
    section_ids: [{ type: mongoose.Types.ObjectId, ref: "Sections", default: [] }],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);