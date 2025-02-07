const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title: { type: String, required: true, unique: true, maxlength: 150 },
    description: { type: String, maxlength: 500 },
    isPoint: { type: Boolean, required: true },
    price: { type: Number, required: true, max: 2000 },
    score: { type: Number, required: true, max: 1000 },
    objectives: [{ type: String, maxlength: 100 }],
    categories: [{ type: mongoose.Types.ObjectId, ref: "Categories" }],
    
}, { timestamps: true });

module.exports = mongoose.model("Courses", CourseSchema);