const Joi = require("joi");
const mongoose = require("mongoose");
const Categories = require("../models/Category");

const validateCategory = Joi.object({
    name: Joi.string().trim().max(100).required()
});

async function createCategory(req, res) { // Create Category: parameter => (name)
    try {
        const { name } = req.body;
        const { error } = validateCategory.validate({ name });
        // Validate Request
        if (error && error.details[0].type === "string.empty") return res.status(400).json({error: "กรุณาป้อนข้อมูลหมวดหมู่"});
        if (error && error.details[0].type === "string.max") return res.status(400).json({error: "กรุณาป้อนข้อมูลไม่เกิน 100 ตัวอักษร"});
        // When Success
        const category = await Categories.create({
            name: name
        });
        return res.status(201).json({
            data: category,
            success: "สร้างหมวดหมู่สำเร็จ"
        });
    } catch (err) {
        console.log({ position: "Create Category", error: err });
        return res.status(409).json({
            error: "มีข้อมูลหมวดหมู่นี้แล้ว"
        });
    }
}

async function getCategories(req, res) { // Get Category: parameter => (page, pageSize)
    let { page, pageSize } = req.query;
    page = page === "0" ? 0 : parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 20;
    const skip = page === 0 ? 0 : page * pageSize;
    try {
        const categories = await Categories.find()
            .select("_id name updatedAt")
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        const total = await Categories.countDocuments();
        return res.status(200).json({
            data: categories,
            pagination: {
                total, page, pageSize, totalPages: Math.ceil(total/pageSize)
            }
        });
    } catch (err) {
        console.log({ position: "Get Category", error: err });
        return res.status(500).json({
            error: "มีข้อผิดพลาดบางอย่างเกิดขึ้น"
        });
    }
}

async function searchCategoryByName(req, res) { // Search Category: parameter => (name, page, pageSize)
    let { page, pageSize, name } = req.query;
    page = page === "0" ? 0 : parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 20;
    const skip = page === 0 ? 0 : page * pageSize;
    try {
        const categories = await Categories.find({ name: { $regex: name, $options: 'i' } })
            .select("_id name updatedAt")
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        const total = await Categories.countDocuments();
        return res.status(200).json({
            data: categories,
            pagination: {
                total, page, pageSize, totalPages: Math.ceil(total/pageSize)
            }
        });
    } catch (err) {
        console.log({ position: "Get Category", error: err });
        return res.status(500).json({
            error: "มีข้อผิดพลาดบางอย่างเกิดขึ้น"
        });
    }
}

async function editCategory(req, res) { // Edit Category: parameter => (_id)
    const { _id } = req.body;
    try {
        if (!_id) return res.status(404).json({error: "ไม่พบข้อมูลของหมวดหมู่"});
        const category = await Categories.findById(_id, "name").exec();
        return res.status(200).json({ data: category });
    } catch (error) {
        console.log({ position: "Edit Category", error:err });
        return res.status(500).json({
            error: "มีข้อผิดพลาดบางอย่างเกิดขึ้น"
        });
    }
}

async function updateCategory(req, res) { // Edit Category: parameter => (_id, name)
    const { _id, name } = req.body;
    try {
        if (!_id) return res.status(404).json({error: "ไม่พบข้อมูลของหมวดหมู่"});
        const { error } = validateCategory.validate({ name });
        // Validate Request
        if (error && error.details[0].type === "string.empty") return res.status(400).json({error: "กรุณาป้อนข้อมูลหมวดหมู่"});
        if (error && error.details[0].type === "string.max") return res.status(400).json({error: "กรุณาป้อนข้อมูลไม่เกิน 100 ตัวอักษร"});
        const response = await Categories.updateOne({ _id }, { $set: { name } });
        return res.status(200).json({ success: "อัพเดตข้อมูลหมวดหมู่สำเร็จ" });
    } catch (err) {
        console.log({ position: "Update Category", error: err });
        return res.status(409).json({
            error: "มีข้อมูลหมวดหมู่นี้แล้ว"
        });
    }
}

async function deleteCategories(req, res) { // Delete Many Category: parameter => (_ids:array)
    const { _ids } = req.body;
    try {
        if (typeof _ids === "object" && _ids.length > 0) {
            const response = await Categories.deleteMany({ _id: { $in: _ids } });
            return res.status(200).json({ success: "ลบข้อมูลหมวดหมู่สำเร็จ" });
        } else {
            return res.status(404).json({ error: "ไม่พบรายการหมวดหมู่" });
        }
    } catch (err) {
        console.log({ position: "Delete Category", error: err });
        return res.status(500).json({error: "มีข้อผิดพลาดบางอย่างเกิดขึ้น"});
    }
}

module.exports = {
    createCategory,
    getCategories,
    editCategory,
    updateCategory,
    deleteCategories,
    searchCategoryByName
}