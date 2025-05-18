const express = require("express");
const {
    getDashboardOverview,
} = require("../controllers/admindashboardController");
const { verifyToken } = require("../middlewares/auth"); 

const router = express.Router();

router.get("/getAdminDashboard", verifyToken, getDashboardOverview);

module.exports = router;