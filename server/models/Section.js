const mongoose = require("mongoose");
const { Schema } = mongoose;

const SectionSchema = new Schema({
    name: { type: String, required: true },
    order: { type: Number, required: true },
    lessons: [{ type: mongoose.Types.ObjectId, ref: "Lessons" }]
}, { timestamps: true });

module.exports = mongoose.Model("Sections", SectionSchema);