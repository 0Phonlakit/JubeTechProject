// joi
const Joi = require("joi");
// schema
const mongoose = require("mongoose");
const Questions = require("../models/Question");

const QuestionBlueprint = Joi.object({
    question: Joi.string().trim().required(),
    type: Joi.string().valid("multiple_choice", "coding", "open_ended").required(),
    choices: Joi.array().items(Joi.string()),
    test_case: Joi.array().items(Joi.string()),
    has_solution: Joi.boolean(),
    solution: Joi.string(),
});

const createQuestion = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { error } = QuestionBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // create question
        await Questions.create({
            ...req.body,
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        return res.status(200).json({ message: "The question was created successfully." });
    } catch (err) {
        console.error({ position: "Create question", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const updateQuestion = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { question_id } = req.params;
        const { error } = QuestionBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!question_id) return res.status(404).json({ message: "The question was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // check owner
        const check_question = await Questions.findOne({
            _id: new mongoose.Types.ObjectId(_id),
            createdBy: new mongoose.Types.ObjectId(question_id)
        });
        if (!check_question) return res.status(403).json({ message: "The question must be updated by the owner." });
        // update question
        await Questions.findByIdAndUpdate(question_id, {
            ...req.body,
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
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
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!question_id) return res.status(404).json({ message: "The question was not found." });
        // check owner
        const check_question = await Questions.findOne({
            _id: new mongoose.Types.ObjectId(_id),
            createdBy: new mongoose.Types.ObjectId(question_id)
        });
        if (!check_question) return res.status(403).json({ message: "The question must be updated by the owner." });
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
    deleteQuestion
}