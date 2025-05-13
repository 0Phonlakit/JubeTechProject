// joi
const Joi = require("joi");
// schema
const mongoose = require("mongoose");
const Exams = require("../models/Exam");
const Questions = require("../models/Question");

const TestcaseBlueprint = Joi.object({
    stdin: Joi.string().allow("").optional(),
    stdout: Joi.string().allow("").optional(),
    _id: Joi.string().allow("").optional()
});

const QuestionBlueprint = Joi.object({
    chosen: Joi.boolean().optional(),
    selected: Joi.boolean().optional(),
    exam_id: Joi.string().optional(),
    _id: Joi.string().optional(),
    question: Joi.string().trim().required(),
    question_image: Joi.string().allow("").optional(),
    type: Joi.string().valid("multiple_choice", "coding", "open_ended").required(),
    choices: Joi.array().items(Joi.any()),
    test_case: Joi.array().items(TestcaseBlueprint),
    has_solution: Joi.boolean(),
    solution: Joi.string().allow("").optional(),
});

const QuestionBlueprintArr = Joi.object({
    questions: Joi.array().items(QuestionBlueprint),
    exam_id: Joi.string().allow("").optional()
});

const createQuestion = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { exam_id } = req.body;
        const { error } = QuestionBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!exam_id) return res.status(404).json({ message: "The exam was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // create question
        const exam = await Exams.findById(exam_id);
        const question = await Questions.create({
            ...req.body,
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        exam.question_ids = [...exam.question_ids, new mongoose.Types.ObjectId(question._id)];
        exam.save();
        return res.status(201).json({ message: "The question was created successfully." });
    } catch (err) {
        console.error({ position: "Create question", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const updateOneQuestion = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { question_id } = req.params;
        const { error } = QuestionBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!question_id) res.status(404).json({ message: "The question was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // update question
        await Questions.findByIdAndUpdate(question_id, {
            ...req.body,
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        return res.status(200).json({ message: "The question was updated successfully." });
    } catch (err) {
        console.error({ position: "Update one question", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const updateQuestion = async(req, res) => {
    try {
        // check req
        const { questions, exam_id } = req.body;
        const { _id } = req.verify_user;
        const { error } = QuestionBlueprintArr.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!exam_id) return res.status(404).json({ message: "The exam was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // update questions
        questions.map(async(question) => {
            await Questions.findByIdAndUpdate(question._id, {
                question: question.question,
                type: question.type,
                question_image: question.question_image ?? "",
                choices: question.choices ?? [],
                test_case: question.test_case ?? [],
                has_solution: question.has_solution,
                solution: question.solution,
                updatedBy: new mongoose.Types.ObjectId(_id)
            });
        })
        const exam = await Exams.findById(exam_id);
        const modifyQuestion = questions.map(question => new mongoose.Types.ObjectId(question._id));
        exam.question_ids = modifyQuestion;
        exam.save();
        return res.status(200).json({ message: "The question was updated successfully." });
    } catch (error) {
        console.error({ position: "Update question", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const deleteQuestion = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { question_id } = req.params;
        const { exam_id } = req.query;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!question_id) return res.status(404).json({ message: "The question was not found." });
        if (!exam_id) return res.status(404).json({ message: "The exam was not found." });
        // check owner
        const check_question = await Questions.findOne({
            _id: new mongoose.Types.ObjectId(question_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        if (!check_question) return res.status(403).json({ message: "The question must be deleted by the owner." });
        const exam = await Exams.findById(exam_id);
        exam.question_ids = exam.question_ids.filter(
            id => String(id) !== String(question_id)
        );
        exam.save();
        // delete question
        await Questions.findByIdAndDelete(question_id);
        return res.status(200).json({ message: "The question was deleted successfully." });
    } catch (error) {
        console.error({ position: "Delete question", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    updateOneQuestion
}