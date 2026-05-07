const express=require("express")
const ProtegidoController = require("../controllers/protegidoController")

const router=express.Router()

router.get("/lista",ProtegidoController.listarPessoas)
router.get("/lista/:id",ProtegidoController.listarPessoaPorId)
router.post("/incluir",ProtegidoController.incluirPessoa)
router.post("/atualizar",ProtegidoController.atualizarPessoa)
router.post("/ativar/:id",ProtegidoController.ativarPessoa)
router.post("/desativar/:id",ProtegidoController.desativarPessoa)

module.exports=router