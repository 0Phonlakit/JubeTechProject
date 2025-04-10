const mongoose = require("mongoose");
const { Schema } = mongoose;

const SectionSchema = new Schema({
    title: { type: String, required: true, maxlength: 100 },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    lesson_ids: [{ type: mongoose.Types.ObjectId, default: [], ref: "Lessons" }],
}, { timestamps: true });

module.exports = mongoose.model("Sections", SectionSchema);