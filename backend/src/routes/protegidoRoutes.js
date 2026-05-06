const express=require("express")
const ProtegidoController = require("../controllers/protegidoController")

const router=express.Router()

router.get("/lista",ProtegidoController.listarPessoas)
router.post("/incluir",ProtegidoController.incluirPessoa)

module.exports=router