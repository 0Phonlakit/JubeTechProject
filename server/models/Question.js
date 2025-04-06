const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    type: { type: String, enum: ["multiple_choice", "coding", "open_ended"] },
    choices: [{ type: String }],
    test_case: [{ type: String }],
    has_solution: { type: Boolean },
    solution: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Questions = mongoose.model("Questions", QuestionSchema);
module.exports = Questions;