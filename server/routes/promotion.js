const express = require("express");
const {
    getAllPromotions,
    createPromotion,
    getPromotionById,
    updatePromotion,
    deletePromotion,
} = require("../controllers/promotionManagement");
const { verifyToken } = require("../middlewares/auth"); 

const router = express.Router();

router.get("/getAllPromotions", verifyToken, getAllPromotions);
router.post("/createPromotion", verifyToken, createPromotion);
router.get("/getPromotion/:id", verifyToken, getPromotionById);
router.put("/updatePromotion/:id", verifyToken, updatePromotion);
router.delete("/deletePromotion/:id", verifyToken, deletePromotion);

module.exports = router;