// Joi validate
const Joi = require("joi");
// schema
const mongoose = require("mongoose");
const Courses = require("../models/Course");
const Lessons = require("../models/Lesson");
const Sections = require("../models/Section");

const SectionBlueprint = Joi.object({
    course_id: Joi.string().optional(),
    _id: Joi.string().optional(),
    title: Joi.string().trim().max(70).required(),
    lesson_ids: Joi.array().items(Joi.any()).optional()
});
const SectionArrBlueprint = Joi.object({
    course_id: Joi.string().optional(),
    sections: Joi.array().items(SectionBlueprint).required()
});

const createSections = async(req, res) => {
    try {
        // check user id
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        // check request
        const { error } = SectionArrBlueprint.validate(req.body, { abortEarly: false });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // create section
        const { sections } = req.body;
        const modifySections = sections.map(secion => ({
            ...secion,
            lesson_ids: secion.lesson_ids.map(lesson_id => new mongoose.Types.ObjectId(lesson_id)),
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        }));
        await Sections.insertMany(modifySections);
        return res.status(200).json({ message: "Sections were created successfully." });
    } catch (err) {
        console.error({ position: "Create Section", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const createOneSection = async(req, res) => {
    try {
        // check request
        const { course_id } = req.body;
        const { _id } = req.verify_user;
        const { error } = SectionBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(400).json({ message: "The user was not found." });
        if (!course_id) return res.status(400).json({ message: "The course was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // create section
        const section = await Sections.create({
            ...req.body,
            lesson_ids: req.body.lesson_ids.map(lesson_id => new mongoose.Types.ObjectId(lesson_id)),
            createdBy: new mongoose.Types.ObjectId(_id),
            updatedBy: new mongoose.Types.ObjectId(_id)
        });
        const course = await Courses.findOne({
            _id: new mongoose.Types.ObjectId(course_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        course.section_ids = [...course.section_ids, new mongoose.Types.ObjectId(section._id)];
        await course.save();
        return res.status(200).json({ data: section, message: "The section was created successfully." });
    } catch (err) {
        console.error({ position: "Create one section", error: err });
        return res.status(500).json({ message: "Error occurred during section creation." });
    }
}

const getSectionById = async(req, res) => {
    try {
        // check user id
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        // check section id
        const { section_id } = req.params;
        if (!section_id) return res.status(404).json({ message: "The section was not found" });
        // query section
        const section = await Sections.findOne({
            _id: new mongoose.Types.ObjectId(section_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        }).populate("lesson_ids");
        return res.status(200).json({ data: section });
    } catch (err) {
        console.error({ position: "Get Section By Id", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const updateSection = async(req, res) => {
    try {
        // check req
        const { sections, course_id } = req.body;
        const { _id } = req.verify_user;
        const { error } = SectionArrBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!course_id) return res.status(404).json({ message: "The course was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // update sections
        sections.map(async(section) => {
            await Sections.findByIdAndUpdate(section._id, {
                title: section.title,
                lesson_ids: section.lesson_ids.map(lesson => new mongoose.Types.ObjectId(lesson)),
                updatedBy: new mongoose.Types.ObjectId(_id)
            });
        })
        const course = await Courses.findById(course_id);
        const modifySection = sections.map(section => new mongoose.Types.ObjectId(section._id));
        course.section_ids = modifySection;
        course.save();
        return res.status(200).json({ message: "The section was updated successfully." });
    } catch (error) {
        console.error({ position: "Update section", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const deleteSection = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        const { section_id } = req.params;
        const { course_id } = req.query;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        if (!section_id) return res.status(404).json({ message: "The section was not found." });
        if (!course_id) return res.status(404).json({ message: "The course was not found." });
        // check owner
        const check_section = await Sections.findOne({
            _id: new mongoose.Types.ObjectId(section_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        if (!check_section) return res.status(403).json({ message: "The section must be deleted by the owner." });
        const course = await Courses.findById(course_id);
        course.section_ids = course.section_ids.filter(
            id => String(id) !== String(section_id)
        );
        course.save();
        // delete section
        await Sections.findByIdAndDelete(section_id);
        return res.status(200).json({ message: "The section was deleted successfully." });
    } catch (err) {
        console.error({ position: "Delete Section", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const attachLessonInSection = async(req, res) => {
    try {
        // check request
        const { _id } = req.verify_user;
        const { lesson_id, section_id } = req.body;
        if (!_id) return res.status(400).json({ message: "The user was not found." });
        if (!lesson_id) return res.status(400).json({ message: "The lesson was not found." });
        if (!section_id) return res.status(400).json({ message: "The section was not found." });
        // query & attach
        const section = await Sections.findOne({
            _id: new mongoose.Types.ObjectId(section_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        if (section) {
            section.lesson_ids = [...section.lesson_ids, new mongoose.Types.ObjectId(lesson_id)];
            await section.save();
            return res.status(200).json({ message: "The lesson was attached from section successfully." });
        } else {
            return res.status(500).json({ message: "Error from attach lesson from section." });
        }
    } catch (err) {
        console.error({ position: "Attach lesson in section", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const removeAttachLesson = async(req, res) => {
    try {
        // check request
        const { _id } = req.verify_user;
        const { lesson_id, section_id } = req.body;
        if (!_id) return res.status(400).json({ message: "The user was not found." });
        if (!lesson_id) return res.status(400).json({ message: "The lesson was not found." });
        if (!section_id) return res.status(400).json({ message: "The section was not found." });
        // query & unattach
        const section = await Sections.findOne({
            _id: new mongoose.Types.ObjectId(section_id),
            createdBy: new mongoose.Types.ObjectId(_id)
        });
        section.lesson_ids = section.lesson_ids.filter(
            id => String(id) !== String(lesson_id)
        );
        section.save();
        return res.status(200).json({ message: "The lesson was detached from section successfully." })
    } catch (err) {
        console.error({ position: "Attach lesson in section", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = {
    createSections,
    getSectionById,
    updateSection,
    deleteSection,
    createOneSection,
    attachLessonInSection,
    removeAttachLesson
}