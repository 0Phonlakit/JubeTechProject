// Joi Validate
const Joi = require("joi");
// Schema
const Lessons = require("../models/Lesson");

const LessonBlueprint = Joi.object({
    name: Joi.string().trim().max(45).required(),
    type: Joi.string().valid("lecture", "video").required(),
    sub_file: Joi.string(),
    main_content: Joi.string().required(),
    duration: Joi.number().integer(),
    order: Joi.number().integer().required(),
    isFreePreview: Joi.boolean().required()
});
const LessonBlueprintArr = Joi.array().items(LessonBlueprint).required();