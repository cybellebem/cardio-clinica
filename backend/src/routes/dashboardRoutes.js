const router = require("express").Router();

const DashboardController = require("../controllers/dashboardController");

router.get("/resumo", DashboardController.resumo);

module.exports = router;