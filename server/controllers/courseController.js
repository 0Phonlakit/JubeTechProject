// Joi Validate
const Joi = require("joi");
// Schema
const slugify = require("slugify");
const mongoose = require("mongoose");
const { v4:uuidv4 } = require("uuid");
const User = require("../models/User");
const Courses = require("../models/Course");

const CourseBlueprint = Joi.object({
    // required
    title: Joi.string().trim().min(10).max(150).required(),
    description: Joi.string().trim().max(500).required(),
    thumbnail: Joi.string().required(),
    usePoint: Joi.boolean().required(),
    price: Joi.number().integer().min(0).max(2000).required(),
    point: Joi.number().integer().min(0).max(1000).required(),
    objectives: Joi.array().items(Joi.string().trim().max(100).required()),
    status: Joi.string().valid("draft", "published", "archived").required(),
    categories: Joi.array().items(Joi.string().required()),
    instructor: Joi.string().required(),
    // optianal
    sections: Joi.array().items(Joi.string()),
    note: Joi.string().max(7000),
    course_id: Joi.string(),
    rating: Joi.number().min(0).max(5),
});

const createCourse = async(req, res) => {
    try {
        const { error } = CourseBlueprint.validate(req.body, { abortEarly: false });
        if (error && error.details) return res.status(400).json({ message: error.details });
        const { title, price, point, instructor, categories, sections } = req.body;
        // check user
        const tutor = await User.findById(instructor, "_id");
        if (!tutor) return res.status(404).json({ message: "ไม่พบผู้ใช้งานในการสร้างคอร์ส" });
        // create course
        let slug_course = slugify(title);
        if (!slug_course) slug_course = uuidv4();
        await Courses.create({
            ...req.body,
            price: parseInt(price),
            point: parseInt(point),
            instructor: new mongoose.Types.ObjectId(instructor),
            categories: categories.length > 0
            ? categories.map(category => new mongoose.Types.ObjectId(category)) : [],
            sections: sections.length > 0
            ? sections.map(section => new mongoose.Types.ObjectId(section)) : [],
            slug: slug_course,
            createdBy: new mongoose.Types.ObjectId(instructor)
        });
        return res.status(201).json({ message: "สร้างคอร์สเรียนสำเร็จ" });
    } catch (err) {
        console.log({ position: "Create Course", error: err });
        return res.status(409).json({ message: "ไม่สามารถมีชื่อเรื่องคอร์สเรียนซ้ำได้" });
    }
}

const getCourses = async(req, res) => {
    try {
        const { page } = req.query;
        const parsePage = parseInt(page);
        const skip = parsePage * 10;
        const courses = await Courses.find()
            .select("_id title description rating price")
            .skip(skip)
            .limit(parsePage)
            .lean();
        const total = await Courses.countDocuments();
        return res.status(200).json({
            data: courses,
            pagination: {
                total, page:parsePage, pageSize:10, totalPages: Math.ceil(total/10) 
            }
        });
    } catch (err) {
        console.log({ position: "Get Courses", error: err });
        return res.status(500).json({ message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น" });
    }
}

const getCourseById = async(req, res) => {
    try {
        const { course_id } = req.params;
        if (!course_id) return res.status(404).json({ message: "ไม่พบคอร์สเรียน" });
        // query course
        const course = await Courses.findById(course_id);
        return res.status(200).json({ data: course });
    } catch (err) {
        console.log({ position: "Get Course By Id", error: err });
        return res.status(500).json({ message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น" });
    }
}

const updateCourse = async(req, res) => {
    try {
        const { error } = CourseBlueprint.validate(req.body, { abortEarly: false });
        if (error && error.details) return res.status(400).json({ message: error.details });
        const { course_id, price, point, instructor, categories, sections } = req.body;
        // check course id
        if (!course_id) return res.status(404).json({ message: "ไม่พบคอร์สเรียน" });
        delete req.body.course_id;
        // update course
        let slug_course = slugify(title);
        if (!slug_course) slug_course = uuidv4();
        await Courses.findByIdAndUpdate(course_id, {
            ...req.body,
            price: parseInt(price),
            point: parseInt(point),
            instructor: new mongoose.Types.ObjectId(instructor),
            categories: categories.length > 0
            ? categories.map(category => new mongoose.Types.ObjectId(category)) : [],
            sections: sections.length > 0
            ? sections.map(section => new mongoose.Types.ObjectId(section)) : [],
            slug: slug_course,
            createdBy: new mongoose.Types.ObjectId(instructor)
        });
        return res.status(200).json({ message: "อัพเดตคอร์สเรียนสำเร็จ" });
    } catch (err) {
        console.log({ position: "Update Course", error: err });
        return res.status(500).json({ message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น" });
    }
}

const deleteCourse = async(req, res) => {
    try {
        const { course_id } = req.body;
        if (!course_id) return res.status(404).json({ message: "ไม่พบคอร์สเรียน" });
        await Courses.findByIdAndDelete(course_id);
        return res.status(200).json({ message: "ลบคอร์สเรียนสำเร็จ" });
    } catch (err) {
        console.log({ position: "Delete Course", error: err });
        return res.status(500).json({ message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น" });
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}