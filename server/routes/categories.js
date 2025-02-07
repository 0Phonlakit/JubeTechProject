const express = require("express");
const {
    createCategory,
    getCategories,
    editCategory,
    updateCategory,
    deleteCategories,
    searchCategoryByName,
    getAllcategories 
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/category/edit", editCategory);
router.get("/category/all", getAllcategories);
router.put("/category/update", updateCategory);
router.post("/category/create", createCategory);
router.get("/category/pagination", getCategories);
router.delete("/category/delete", deleteCategories);
router.get("/category/search", searchCategoryByName);

module.exports = router;