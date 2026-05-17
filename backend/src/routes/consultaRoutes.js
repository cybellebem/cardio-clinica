const express=require("express")
const ConsultaController=require("../controllers/consultaController")
const {authToken,authRole}=require("../middlewares/authMiddleware")

const router=express.Router()

// consultas
router.get("",authToken,authRole("Medico"),ConsultaController.listarConsultas)
router.get("/:id",authToken,authRole("Medico"),ConsultaController.listarConsultaPorId)
router.post("/incluir",authToken,authRole("Medico"),ConsultaController.incluirConsulta)

module.exports=router