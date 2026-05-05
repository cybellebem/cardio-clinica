const express=require("express")
const ProtegidoController = require("../controllers/protegidoController")

const router=express.Router()

router.get("/lista",ProtegidoController.listarPessoas)

module.exports=router