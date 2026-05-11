const express=require("express")
const ConsultaController=require("../controllers/consultaController")
const {authToken,authRole}=require("../middlewares/authMiddleware")

const router=express.Router()

// consultas
router.get("/lista",authToken,authRole("Médico"),ConsultaController.listarConsultas)
router.get("/lista/:id",authToken,authRole("Médico"),ConsultaController.listarConsultaPorId)
// router.post("/incluir",authToken,authRole("Médico"))

module.exports=router