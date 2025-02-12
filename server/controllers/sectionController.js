// Joi Validate
const Joi = require("joi");
// Schema
const mongoose = require("mongoose");
const Sections = require("../models/Section");

const SectionBlueprint = Joi.object({
    name: Joi.string().trim().max(40).required(),
    order: Joi.number().integer().required(),
    lessons: Joi.array().items(Joi.string()),
});
const SectionBlueprintArr = Joi.array().items(SectionBlueprint).required();