const express = require("express");
const { createCategory, getCategories, editCategory, updateCategory, deleteCategories, searchCategoryByName } = require("../controllers/categoryController");

const router = express.Router();

router.post("/category/create", createCategory);
router.post("/category/edit", editCategory);
router.put("/category/update", updateCategory);
router.get("/category/pagination", getCategories);
router.delete("/category/delete", deleteCategories);
router.get("/category/search", searchCategoryByName);

module.exports = router;