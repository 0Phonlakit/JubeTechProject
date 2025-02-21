// Joi validate
const Joi = require("joi");
// schema
const mongoose = require("mongoose");
const Sections = require("../models/Section");

const SectionBlueprint = Joi.object({
    title: Joi.string().trim().max(70).required(),
    lesson_ids: Joi.array().items(Joi.string())
});
const SectionArrBlueprint = Joi.object({
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
            ...sections,
            lesson_ids: sections.lesson_ids.map(lesson_id => new mongoose.Types.ObjectId(lesson_id)),
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

module.exports = {
    createSections
}