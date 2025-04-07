// joi
const Joi = require("joi");
// schema
const mongoose = require("mongoose");
const Exams = require("../models/Exam");

const ExamBlueprint = Joi.object({
    title: Joi.string().trim().max(50).required(),
    description: Joi.string().trim().max(300).required(),
    question_ids: Joi.array().items(Joi.string()),
});

const createExam = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        const { error } = ExamBlueprint.validate(req.body, { abortEarly: false });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // create exam
        const { question_ids } = req.body;
        await Exams.create({
            ...req.body,
            question_ids: question_ids.map((question_id) => new mongoose.Types.ObjectId(question_id)),
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        return res.status(200).json({ message: "The exam was created successfully." });
    } catch (err) {
        console.error({ position: "Create exam", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const getManyExams = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        // query exam
        const filter = {};
        filter.createdBy = new mongoose.Types.ObjectId(_id);
        const { page = 1, pageSize = 10, sortField = "title", sortOrder = "ascend", title = "" } = req.query;
        const skip = (page - 1) * pageSize;
        const sort = { [sortField]: sortOrder === "descend" ? -1 : 1 };
        if (title) filter.title = { $regex: title, $options: "i" };
        const [results, total] = await Promise.all([
            Exams.find(filter)
            .select("_id title description updatedAt question_ids")
            .sort(sort)
            .skip(skip)
            .limit(Number(pageSize))
            .lean(),
            Exams.countDocuments(filter)
        ]);
        return res.status(200).json({ data: results, pagination: { total, page, pageSize, totalPage: Math.ceil(total / pageSize) } });
    } catch (err) {
        console.error({ position: "Get many exams", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const getExamById = async(req, res) => {
    try {
        // check req
        const { exam_id } = req.params;
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!exam_id) return res.status(404).json({ message: "The exam was not found." });
        // query
        const exam = await Exams.find({
            _id: new mongoose.Types.ObjectId(exam_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        })
        .populate({
            path: "question_ids",
            select: "_id question type  choices test_case has_solution solution"
        })
        .lean();
        return res.status(200).json({ data: [exam] });
    } catch (err) {
        console.error({ position: "Get exam by id", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const updateExam = async(req, res) => {
    try {
        // check req
        const { exam_id } = req.params;
        const { _id } = req.verify_user;
        const { error } = ExamBlueprint.validate(req.body, { abortEarly: false });
        if (!exam_id) return res.status(404).json({ message:"The exam was not found." });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // check owner
        const check_exam = await Exams.findOne({
            _id: new mongoose.Types.ObjectId(exam_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        if (!check_exam) return res.status(403).json({ message: "The exam must be updated by the owner." });
        // update exam
        const { question_ids } = req.body;
        await Exams.findByIdAndUpdate(exam_id, {
            ...req.body,
            question_ids: question_ids.map((question_id) => new mongoose.Types.ObjectId(question_id)),
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        return res.status(200).json({ message: "The exam was updated successfuly." });
    } catch (err) {
        console.error({ position: "Update exam", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const deleteExam = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { exam_id } = req.params;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!exam_id) return res.status(404).json({ message: "The exam was not found." });
        // check owner
        const check_exam = await Exams.findOne({
            _id: new mongoose.Types.ObjectId(exam_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        if (!check_exam) return res.status(403).json({ message: "The exam must be deleted by the owner." });
        // delete exam
        await Exams.findByIdAndDelete(exam_id);
        return res.status(200).json({ message: "The exam was deleted successfully." });
    } catch (err) {
        console.error({ position: "Delete exam", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = {
    createExam,
    getManyExams,
    getExamById,
    updateExam,
    deleteExam
}