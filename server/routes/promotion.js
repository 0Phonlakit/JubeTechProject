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

router.get("/getAllPromotions", verifyToken, verifyRole(["Admin"]), getAllPromotions);
router.post("/createPromotion", verifyToken, verifyRole(["Admin"]), createPromotion);
router.get("/getPromotion/:id", verifyToken, verifyRole(["Admin"]), getPromotionById);
router.put("/updatePromotion/:id", verifyToken, verifyRole(["Admin"]), updatePromotion);
router.delete("/deletePromotion/:id", verifyToken, verifyRole(["Admin"]), deletePromotion);

module.exports = router;