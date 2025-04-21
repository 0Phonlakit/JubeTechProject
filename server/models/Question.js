const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    type: { type: String, enum: ["multiple_choice", "coding", "open_ended"] },
    question_image: { type: String },
    choices: [{ type: String }],
    test_case: [
        {
            stdin: { type: String },
            stdout: { type: String }
        },
    ],
    has_solution: { type: Boolean },
    solution: { type: String, default: "" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Questions = mongoose.model("Questions", QuestionSchema);
module.exports = Questions;