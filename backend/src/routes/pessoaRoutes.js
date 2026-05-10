const express=require("express")
const ProtegidoController = require("../controllers/protegidoController")

const router=express.Router()

router.get("/lista",ProtegidoController.listarPessoas)
router.get("/lista/:id",ProtegidoController.listarPessoaPorId)
router.post("/incluir",ProtegidoController.incluirPessoa)
router.patch("/atualizar",ProtegidoController.atualizarPessoa)
router.patch("/ativar/:id",ProtegidoController.ativarPessoa)
router.patch("/desativar/:id",ProtegidoController.desativarPessoa)

module.exports=router