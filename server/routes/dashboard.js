const express = require("express");
const {
    getDashboardOverview,
} = require("../controllers/admindashboardController");

const router = express.Router();

router.get("/getAdminDashboard", getDashboardOverview);

module.exports = router;