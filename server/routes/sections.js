const express = require("express");
const {
    deleteSection,
    updateSection,
    createOneSection,
    removeAttachLesson,
    attachLessonInSection
} = require("../controllers/sectionController");
const { verifyToken, verifyRole } = require("../middlewares/auth");

const router = express.Router();

router.put("/section/update", verifyToken, verifyRole(["Tutor"]), updateSection);
router.post("/section/create", verifyToken, verifyRole(["Tutor"]), createOneSection);
router.post("/section/detach", verifyToken, verifyRole(["Tutor"]), removeAttachLesson);
router.post("/section/attach", verifyToken, verifyRole(["Tutor"]), attachLessonInSection);
router.delete("/section/delete/:section_id", verifyToken, verifyRole(["Tutor"]), deleteSection);

module.exports = router;