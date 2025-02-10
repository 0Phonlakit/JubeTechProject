const mongoose = require("mongoose");
const { Schema } = mongoose;

const LessonSchema = new Schema({
    name: { type: String, required: true, maxlength: 80 },
    type: { type: String, enum: ["lecture", "video"], required: true },
    sub_file: { type: String },
    main_content: { type: String },
    duration: { type: Number, default: 0 },
    order: { type: Number, required: true },
    isFreePreview: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.Model("Lessons", LessonSchema);