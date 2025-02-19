// Joi Validate
const Joi = require("joi");
// Schema
const mongoose = require("mongoose");
const Sections = require("../models/Section");

const SectionBlueprint = Joi.object({
    name: Joi.string().trim().max(40).required(),
    lessons: Joi.array().items(Joi.string()),
});
const SectionBlueprintArr = Joi.object({
    sections: Joi.array().items(SectionBlueprint).required()
});

const createSection = async(req, res) => {
    try {
        const { error } = SectionBlueprintArr.validate(req.body);
        if (error && error.details) return res.status(400).json({ message: error.details });
        // create section
        await Sections.insertMany(req.body.sections);
        return res.status(201).json({ message: "สร้างบทเรียนสำเร็จ" });
    } catch (err) {
        console.log({ position: "Create Section", error: err });
        return res.status(500).json({ message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น" });
    }
}

module.exports = {
    createSection
}