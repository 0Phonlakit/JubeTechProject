const mongoose = require("mongoose");
const { Schema } = mongoose;

const SectionSchema = new Schema({
    name: { type: String, required: true },
    lessons: [{ type: mongoose.Types.ObjectId, ref: "Lessons" }],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Sections", SectionSchema);