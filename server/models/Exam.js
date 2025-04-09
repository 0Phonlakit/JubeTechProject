const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExamSchema = new Schema({
    title: { type: String, required: true, unique: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 300 },
    question_ids: [{ type: mongoose.Types.ObjectId, ref: "Questions" }],
    random_question: { type: Boolean, required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Exams = mongoose.model("Exams", ExamSchema);
module.exports = Exams;