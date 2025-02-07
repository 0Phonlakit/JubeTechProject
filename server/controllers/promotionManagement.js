const mongoose = require("mongoose");
const Promotion = require("../models/Promotion");
const { flushSync } = require("react-dom");

// Get all Promotions
const getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find().populate('courses');
        res.status(200).json(promotions);
    } catch (error) {
        res.status(400).json({ message: "Error fetching promotions", error: err.message });
    }
};

// Get Promotion by ID
const getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id).populate('courses');
        if (!promotion) return res.status(404).json({ message: "Promotion not found" });
        res.status(200).json(promotion);
    } catch (error) {
        res.status(400).json({ message: "Error fetching promotion", error: err.message });
    }
};

// Create Promotion
const createPromotion = async (req, res) => {
    try {
        const { name, for_course, code, courses, status,  
            type, discount, min_purchase_amount, max_discount, 
            condition_type, quantity, start_date, end_date } = req.body;

        if (!Array.isArray(courses)) {
            return res.status(400).json({ message: "Courses must be an array" });
        }
        if (courses.some(id => !mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({ message: "Invalid ObjectId in courses array" });
        }

        const newPromotion = new Promotion({
            name,
            for_course: for_course === "specific" ? "specific" : "all",
            courses: courses.map(id => new mongoose.Types.ObjectId(id)), 
            code,
            status: typeof status === "boolean" ? status : false,
            type: ["amount", "percent"].includes(type) ? type : "amount", 
            discount,
            min_purchase_amount,
            max_discount,
            condition_type: ["Once", "Unlimited", "LimitPerDay"].includes(condition_type) ? condition_type : "Once",
            quantity,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        });

        await newPromotion.save();
        res.status(201).json({ message: "Promotion created successfully", promotion: newPromotion });
    } catch (error) {
        res.status(500).json({ message: "Error creating promotion", error: error.message });
    }
};

// Update Promotion
const updatePromotion = async (req, res) => {
    try{
        const { name, for_course, courses, code, status, 
            type, discount, min_purchase_amount, max_discount, 
            condition_type, quantity, start_date, end_date} = req.body;
        
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        promotion.name = name || promotion.name;
        promotion.for_course = for_course || promotion.for_course;
        promotion.courses = courses.map(id => new mongoose.Types.ObjectId(id))  || promotion.courses;
        promotion.code = code || promotion.code;
        promotion.status = (status || status == false) ? status : promotion.status;
        promotion.type = type || promotion.type;
        promotion.discount = discount || promotion.discount;
        promotion.min_purchase_amount = min_purchase_amount || promotion.min_purchase_amount;
        promotion.max_discount = max_discount || promotion.max_discount;
        promotion.condition_type = condition_type || promotion.condition_type;
        promotion.quantity = quantity || promotion.quantity;
        promotion.start_date = start_date || promotion.start_date;
        promotion.end_date = end_date || promotion.end_date;
        
        await promotion.save();
        res.status(200).json({ message: "Promotion updated successfully", promotion });
    } catch (error) {
        res.status(500).json({ message: "Error updating promotion", error: err.message });
    }
};

// Delete Promotion
const deletePromotion = async (req, res) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
        if (!deletedPromotion) return res.status(404).json({ message: "Promotion not found" });
        res.status(200).json({ message: "Promotion deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting promotion", error: err.message });
    }
};

module.exports = { 
    getAllPromotions, 
    getPromotionById, 
    createPromotion, 
    updatePromotion, 
    deletePromotion 
};