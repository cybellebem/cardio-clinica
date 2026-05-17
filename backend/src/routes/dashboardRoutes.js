const express = require("express");

const DashboardController = require("../controllers/dashboardController");

const { authToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/resumo", authToken, DashboardController.resumo);

module.exports = router;
