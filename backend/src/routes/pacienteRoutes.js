const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", authMiddleware, pacienteController.listar);
router.post(
    "/",
    authMiddleware,
    roleMiddleware("atendente", "administrador"),
    pacienteController.criar
);

module.exports = router;